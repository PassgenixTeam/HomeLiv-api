import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryEntity } from 'src/modules/product-category/entities/product-category.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryEntity, CategoryEntity])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
