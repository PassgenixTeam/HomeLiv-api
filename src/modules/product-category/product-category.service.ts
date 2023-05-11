import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { QueryRunner, Repository } from 'typeorm';
import { differenceMultiArray } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryEntity } from 'src/modules/product-category/entities/product-category.entity';
import { plainToInstance } from 'class-transformer';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private productCategoryRepository: Repository<ProductCategoryEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  create(input: CreateProductCategoryDto) {
    return 'This action adds a new productCategory';
  }

  async createMany(
    categoryIds: string[],
    productId: string,
    queryRunner: QueryRunner,
  ) {
    const productCategories = await this.productCategoryRepository.find({
      where: {
        productId,
      },
    });

    const { list1Only, list2Only, common } = differenceMultiArray(
      productCategories,
      categoryIds,
    );

    const productCategoryInstances = await Promise.all(
      list2Only.map(async (item) => {
        const category = await this.categoryRepository.findOne({
          where: {
            id: item,
          },
        });

        if (!category) {
          throw new Error('Category not found');
        }

        const productCategoryInstance = plainToInstance(ProductCategoryEntity, {
          productId,
          categoryId: item,
        });

        return productCategoryInstance;
      }),
    );

    return Promise.all([
      queryRunner.manager.save(productCategoryInstances),
      this.deleteMultiple(list1Only, productId, queryRunner),
    ]);
  }

  async deleteMultiple(
    ids: string[],
    productId: string,
    queryRunner: QueryRunner,
  ) {
    if (!ids.length) {
      return;
    }

    return queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(ProductCategoryEntity)
      .where('product_id = :productId', { productId })
      .andWhere('category_id IN (:...ids)', { ids })
      .execute();
  }
}
