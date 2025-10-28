// src/02-rest-countries/rest-countries.service.ts
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';
import axios from 'axios';
import { Prisma } from '@prisma/client';
import { SvgService } from './svgservice';

@Injectable()
export class RestCountriesService {
  private readonly logger = new Logger(RestCountriesService.name);

  private readonly COUNTRIES_URL =
    'https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies';
  private readonly RATES_URL = 'https://open.er-api.com/v6/latest/USD';

  constructor(
    private prisma: PrismaService,
    private svgService: SvgService,
  ) {}

  /** Fetch countries and exchange rates from external APIs */
  private async fetchExternalData() {
    try {
      const [countriesRes, exchangeRes] = await Promise.all([
        axios.get(this.COUNTRIES_URL, { timeout: 20000 }),
        axios.get(this.RATES_URL, { timeout: 20000 }),
      ]);

      const rates = exchangeRes.data?.rates ?? exchangeRes.data;
      return { countries: countriesRes.data, rates };
    } catch (error) {
      const details = error?.message ?? String(error);
      throw new HttpException(
        { error: 'External data source unavailable', details },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /** Simple random multiplier for GDP calculation */
  private randomMultiplier(min = 1000, max = 2000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Refresh all countries data */
  async refreshCountries() {
    const { countries, rates } = await this.fetchExternalData();
    const now = new Date();

    const existing = await this.prisma.country.findMany({
      select: { id: true, name: true },
    });
    const existingMap: Record<string, number> = {};
    for (const e of existing) existingMap[e.name.toLowerCase()] = e.id;

    const ops: Prisma.PrismaPromise<any>[] = [];

    for (const c of countries) {
      const currency_code =
        Array.isArray(c.currencies) && c.currencies.length > 0
          ? (c.currencies[0]?.code ?? null)
          : null;

      let exchange_rate: number | null = null;
      let estimated_gdp: number | null = null;
      const population = Number(c.population ?? 0);

      if (currency_code) {
        const rateVal =
          rates?.[currency_code] ?? rates?.rates?.[currency_code] ?? null;
        exchange_rate = rateVal ? Number(rateVal) : null;
        if (exchange_rate) {
          estimated_gdp =
            (population * this.randomMultiplier(1000, 2000)) / exchange_rate;
        }
      }

      const lowerName = String(c.name ?? '').toLowerCase();
      const existingId = existingMap[lowerName];

      const data = {
        name: c.name,
        capital: c.capital ?? null,
        region: c.region ?? null,
        population,
        currency_code,
        exchange_rate,
        estimated_gdp,
        flag_url: c.flag ?? null,
        last_refreshed_at: now,
      };

      if (existingId) {
        ops.push(
          this.prisma.country.update({ where: { id: existingId }, data }),
        );
      } else {
        ops.push(this.prisma.country.create({ data }));
      }
    }

    await this.prisma.$transaction(ops);

    const totalCountries = await this.prisma.country.count();
    const top5 = await this.prisma.country.findMany({
      where: { estimated_gdp: { not: null } },
      orderBy: { estimated_gdp: 'desc' },
      take: 5,
    });

    // Generate SVG and save to DB
    const svgString = this.svgService.generateSummarySvgString(
      now,
      top5,
      totalCountries,
    );
    await this.prisma.meta.upsert({
      where: { id: 1 },
      update: {
        total_countries: totalCountries,
        last_refreshed_at: now,
        summary_svg: svgString, // now recognized
      },
      create: {
        id: 1,
        total_countries: totalCountries,
        last_refreshed_at: now,
        summary_svg: svgString,
      },
    });

    return {
      message: 'Refreshed',
      total_countries: totalCountries,
      last_refreshed_at: now.toISOString(),
    };
  }

  /** Get SVG from database */
  async getSvg(): Promise<string> {
    const meta = await this.prisma.meta.findUnique({ where: { id: 1 } });
    return (
      meta?.summary_svg ??
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
      <rect width="100%" height="100%" fill="#fff"/>
      <text x="50" y="50" font-size="24" fill="red">No summary available</text>
    </svg>`
    );
  }

  /** Get all countries with optional filters */
  async getAll(query: any) {
    const { region, currency, sort } = query ?? {};
    const where: any = {};
    if (region) where.region = region;
    if (currency) where.currency_code = currency;

    const orderBy: any =
      sort === 'gdp_desc'
        ? { estimated_gdp: 'desc' }
        : sort === 'gdp_asc'
          ? { estimated_gdp: 'asc' }
          : undefined;

    const countries = await this.prisma.country.findMany({ where, orderBy });
    return countries.map((c) => ({
      id: c.id,
      name: c.name,
      capital: c.capital,
      region: c.region,
      population: c.population,
      currency_code: c.currency_code,
      exchange_rate: c.exchange_rate,
      estimated_gdp: c.estimated_gdp,
      flag_url: c.flag_url,
      last_refreshed_at: c.last_refreshed_at,
    }));
  }

  /** Get one country by name */
  async getByName(name: string) {
    const result = await this.prisma.$queryRaw<any[]>`
    SELECT * FROM Country
    WHERE LOWER(name) = ${name.trim().toLowerCase()}
    LIMIT 1
  `;

    const country = result[0];
    if (!country) {
      throw new HttpException(
        { error: 'Country not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return country;
  }

  /** Delete country by name */
  async deleteByName(name: string) {
    const country = await this.prisma.country.findFirst({ where: { name } });
    if (!country)
      throw new HttpException(
        { error: 'Country not found' },
        HttpStatus.NOT_FOUND,
      );
    await this.prisma.country.delete({ where: { id: country.id } });
    return { message: 'Country deleted' };
  }

  /** Get status */
  async getStatus() {
    const meta = await this.prisma.meta.findUnique({ where: { id: 1 } });
    return meta ?? { total_countries: 0, last_refreshed_at: null };
  }

  /** Get SVG path for /countries/image */
}
