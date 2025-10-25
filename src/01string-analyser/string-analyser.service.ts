import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { StringAnalyserRepository } from './string-analyser.repository';
import { CreateStringAnalyserDto } from './dto/create-string-analyser.dto';

@Injectable()
export class StringAnalyserService {
  constructor(private readonly repo: StringAnalyserRepository) {}

  private analyzeString(value: string) {
    const length = value.length;
    const lower = value.toLowerCase();
    const is_palindrome = lower === [...lower].reverse().join('');
    const unique_characters = new Set(lower).size;
    const word_count = value.trim().split(/\s+/).filter(Boolean).length;
    const sha256_hash = crypto.createHash('sha256').update(value).digest('hex');

    const character_frequency_map: Record<string, number> = {};
    for (const ch of lower) {
      character_frequency_map[ch] = (character_frequency_map[ch] || 0) + 1;
    }

    return {
      length,
      is_palindrome,
      unique_characters,
      word_count,
      sha256_hash,
      character_frequency_map,
    };
  }

  createString(dto: CreateStringAnalyserDto) {
    if (!dto.value || typeof dto.value !== 'string') {
      throw new BadRequestException('Invalid or missing "value" field');
    }

    const existing = this.repo.findByValue(dto.value);
    if (existing) throw new ConflictException('String already exists');

    const properties = this.analyzeString(dto.value);
    const newData = {
      id: properties.sha256_hash,
      value: dto.value,
      properties,
      created_at: new Date().toISOString(),
    };

    this.repo.save(properties.sha256_hash, newData);
    return newData;
  }

  getAllStrings(filters: any) {
    let data = this.repo.findAll();

    if (filters.is_palindrome !== undefined) {
      const boolVal =
        filters.is_palindrome === 'true' || filters.is_palindrome === true;
      data = data.filter((d) => d.properties.is_palindrome === boolVal);
    }
    if (filters.min_length) {
      data = data.filter((d) => d.properties.length >= +filters.min_length);
    }
    if (filters.max_length) {
      data = data.filter((d) => d.properties.length <= +filters.max_length);
    }
    if (filters.word_count) {
      data = data.filter(
        (d) => d.properties.word_count === +filters.word_count,
      );
    }
    if (filters.contains_character) {
      const ch = filters.contains_character.toLowerCase();
      data = data.filter((d) => d.value.toLowerCase().includes(ch));
    }

    return {
      data,
      count: data.length,
      filters_applied: filters,
    };
  }

  getString(value: string) {
    const found = this.repo.findByValue(value);
    if (!found) throw new NotFoundException('String not found');
    return found;
  }

  deleteString(value: string) {
    const deleted = this.repo.deleteByValue(value);
    if (!deleted) throw new NotFoundException('String not found');
  }

  filterByNaturalLanguage(query: string) {
    if (!query || typeof query !== 'string') {
      throw new BadRequestException('Missing or invalid query parameter');
    }

    const lower = query.toLowerCase();
    const filters: Record<string, any> = {};

    if (lower.includes('palindromic')) filters.is_palindrome = true;
    if (lower.includes('single word')) filters.word_count = 1;

    const longer = lower.match(/longer than (\d+)/);
    if (longer) filters.min_length = parseInt(longer[1]) + 1;

    const contains = lower.match(/letter (\w)/);
    if (contains) filters.contains_character = contains[1];

    if (Object.keys(filters).length === 0) {
      throw new BadRequestException('Unable to parse natural language query');
    }

    const result = this.getAllStrings(filters);

    return {
      data: result.data,
      count: result.count,
      interpreted_query: {
        original: query,
        parsed_filters: filters,
      },
    };
  }
}
