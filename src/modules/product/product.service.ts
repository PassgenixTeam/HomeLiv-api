import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFilterDto } from 'src/modules/product/dto/filter.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductCategoryService } from 'src/modules/product-category/product-category.service';
import { PaginationOptions, isArray } from '@app/common';
import {
  decorateTheItems,
  kindsOfLargeObjects,
  lightAndDarkStyle,
  marble,
} from 'src/database/data-fake/data-fake';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private productCategoryService: ProductCategoryService,
    private dataSource: DataSource,
  ) {}

  private logger = new Logger(ProductService.name);

  async create(input: CreateProductDto) {
    const productInstance = plainToInstance(ProductEntity, input);

    productInstance.marble = marble[this.random(marble.length)];
    productInstance.lightAndDarkStyle =
      lightAndDarkStyle[this.random(lightAndDarkStyle.length)];
    productInstance.decorateTheItems =
      decorateTheItems[this.random(decorateTheItems.length)];
    productInstance.kindsOfLargeObjects =
      kindsOfLargeObjects[this.random(kindsOfLargeObjects.length)];

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await queryRunner.manager.save(productInstance);

      await this.productCategoryService.createMany(
        input.categoryIds,
        product.id,
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return 'Product created successfully';
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(pagination: PaginationOptions, filter: ProductFilterDto) {
    const { page, limit } = pagination;
    const { maxPrice, minPrice, name, sort, style, categoryIds, roomType } =
      filter;

    const query = this.productRepository
      .createQueryBuilder('product')
      // .select([
      //   'product.id',
      //   'product.name',
      //   'product.price',
      //   'product.thumbnailUrl',
      //   'product.salePrice',
      //   'product.isSale',
      //   'product.createdAt',
      //   'product.updatedAt',
      // ])
      .skip((page - 1) * limit)
      .take(limit);

    if (maxPrice) {
      query.andWhere('product.price <= :maxPrice', { maxPrice });
    }
    if (minPrice) {
      query.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (name) {
      query.andWhere('product.name LIKE :name', { name: `%${name}%` });
    }

    if (style) {
      query.andWhere('product.style = :style', { style });
    }

    if (roomType) {
      query.andWhere('product.roomType = :roomType', { roomType });
    }

    if (categoryIds) {
      query
        .leftJoinAndSelect('product.productCategories', 'productCategories')
        .andWhere('productCategories.categoryId IN (:...categoryIds)', {
          categoryIds: categoryIds.split(',').map((item) => item.trim()),
        });
    }

    return query.getMany();
  }

  async findOne(id: string) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.productCategories', 'productCategories')
      .leftJoin('productCategories.category', 'category')
      .where('product.id = :id', { id })
      .addSelect(['productCategories', 'category.id', 'category.name'])
      .getOne();

    if (!product) {
      throw new Error('Product not found');
    }

    const categories = product.productCategories.map((item) => item.category);

    delete product.productCategories;

    return {
      ...product,
      thumbnails: isArray(product.thumbnails)
        ? JSON.parse(product.thumbnails)
        : [],
      categories,
    };
  }

  update(id: string, input: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return this.productRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  private random(max) {
    return Math.floor(Math.random() * max);
  }
}

// .select([
//   'product.id as id',
//   'product.name as name',
//   'product.price as price',
//   'product.thumbnailUrl as "thumbnailUrl"',
//   'product.thumbnails::jsonb as "thumbnails"',
//   'product.salePrice as "salePrice"',
//   'product.isSale as "isSale"',
//   'product.isHot as "isHot"',
//   'product.isNew as "isNew"',
//   'product.isBestSeller as "isBestSeller"',
//   'product.additional_information::jsonb as "additionalInformation"',
//   'product.description as "description"',
//   'product.createdAt as "createdAt"',
//   'product.updatedAt as "updatedAt"',
//   `JSON_AGG(
//     JSON_BUILD_OBJECT(
//       'id', category.id,
//       'name', category.name
//     )
//   ) as category`,
// ])
