import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDetailsDto } from '../dtos/product-details.dto';
import { Product } from '../entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getAllProducts();
  }
  @Get(':id')
  async getProductById(
    @Param(ValidationPipe) productDto: ProductDetailsDto,
  ): Promise<Product> {
    return await this.productsService.getProductById(productDto.id);
  }
}
