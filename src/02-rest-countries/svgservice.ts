// src/02-rest-countries/svg.service.ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SvgService {
  private readonly logger = new Logger(SvgService.name);

  /**
   * Generate SVG as string
   */
  generateSummarySvgString(
    lastRef: Date,
    topCountries: any[],
    totalCountries: number,
  ): string {
    const lastRefIso = lastRef.toISOString();

    const lines: string[] = [];
    lines.push(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">`,
    );
    lines.push(`<rect width="100%" height="100%" fill="#ffffff"/>`);
    lines.push(
      `<text x="40" y="60" font-size="36" font-weight="bold" fill="#111">Countries Summary</text>`,
    );
    lines.push(
      `<text x="40" y="110" font-size="20" fill="#111">Total countries: ${totalCountries}</text>`,
    );
    lines.push(
      `<text x="40" y="140" font-size="20" fill="#111">Last refreshed: ${lastRefIso}</text>`,
    );
    lines.push(
      `<text x="40" y="190" font-size="24" fill="#111">Top 5 by Estimated GDP</text>`,
    );

    let y = 230;
    topCountries.forEach((c, idx) => {
      const gdp = c.estimated_gdp
        ? Number(c.estimated_gdp).toLocaleString(undefined, {
            maximumFractionDigits: 1,
          })
        : 'N/A';
      lines.push(
        `<text x="60" y="${y}" font-size="18" fill="#111">${idx + 1}. ${c.name} — ${gdp}</text>`,
      );
      y += 34;
    });

    lines.push(`</svg>`);

    const svgString = lines.join('\n');
    this.logger.log('Summary SVG generated as string');
    return svgString;
  }
}
