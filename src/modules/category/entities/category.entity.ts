import { BaseEntity } from '@app/common';
import { ProductCategoryEntity } from 'src/modules/product-category/entities/product-category.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  thumbnailUrl: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  prompt: string;

  // Relation

  @OneToMany(
    () => ProductCategoryEntity,
    (productCategory) => productCategory.category,
  )
  productCategories: ProductCategoryEntity[];
}
