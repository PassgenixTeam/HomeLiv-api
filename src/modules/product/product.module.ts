import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { ProductCategoryService } from 'src/modules/product-category/product-category.service';
import { ProductCategoryEntity } from 'src/modules/product-category/entities/product-category.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductCategoryEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductCategoryService],
})
export class ProductModule {}
