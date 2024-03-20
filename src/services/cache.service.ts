import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager';
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getItemFromCache(key: number | string): Promise<void> {
     return await this.cacheManager.get(key.toString());
  }
  async setItemInCache(key: number | string, value): Promise<void> {
    return await this.cacheManager.set(key.toString(), value);
  }
}
