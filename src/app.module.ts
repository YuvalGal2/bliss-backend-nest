import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { CacheService } from './services/cache.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/common/cache';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register({ isGlobal: true })],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService, CacheService],
})
export class AppModule {}
