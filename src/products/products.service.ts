import { Injectable, NotFoundException } from '@nestjs/common';
import * as process from 'process';
import { CacheService } from '../services/cache.service';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private cacheService: CacheService) {}

  private readonly apiUrl: string = process.env.API_URL;

  private async hitCache(key): Promise<any | void> {
    return await this.cacheService.getItemFromCache(key);
  }

  private async updateCache(key, value): Promise<any> {
    await this.cacheService.setItemInCache(key, value);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.fetchAndCache(`${this.apiUrl}/products`, 'products');
  }

  async getProductById(id: number): Promise<Product> {
    return await this.fetchAndCache(
      `${this.apiUrl}/products/${id}`,
      String(id),
    );
  }
  private async fetchAndCache(url: string, cacheKey: string): Promise<any> {
    const cacheResults: Product | Product[] = await this.hitCache(cacheKey);
    if (cacheResults) {
      return cacheResults;
    }

    const response: Response = await fetch(url);
    if (!response.ok) {
      throw new NotFoundException(`Failed to fetch data from ${url}`);
    }

    try {
      const json: Promise<any> = await response.json();
      await this.updateCache(cacheKey, json);
      return json;
    } catch (error) {
      throw new NotFoundException(`Failed to fetch data from ${url}`);
    }
  }
}
