import { Injectable } from '@nestjs/common';

@Injectable()
export class StringAnalyserRepository {
  private strings: Map<string, any> = new Map();

  findAll() {
    return Array.from(this.strings.values());
  }

  findByValue(value: string) {
    for (const data of this.strings.values()) {
      if (data.value === value) return data;
    }
    return null;
  }

  save(id: string, data: any) {
    this.strings.set(id, data);
  }

  deleteByValue(value: string) {
    for (const [key, data] of this.strings.entries()) {
      if (data.value === value) {
        this.strings.delete(key);
        return true;
      }
    }
    return false;
  }
}
