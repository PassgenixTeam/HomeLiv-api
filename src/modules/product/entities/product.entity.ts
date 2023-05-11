import {
  BaseEntity,
  ObjectTransformToString,
  StringTransformToObject,
} from '@app/common';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { OrderProductEntity } from 'src/modules/order-product/entities/order-product.entity';
import { ProductCategoryEntity } from 'src/modules/product-category/entities/product-category.entity';
import { ReviewEntity } from 'src/modules/review/entities/review.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  thumbnailUrl: string;

  @Column({ type: 'varchar', length: 255 })
  @ObjectTransformToString()
  @StringTransformToObject()
  thumbnails: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  salePrice: number;

  @Column({ type: 'boolean', default: false })
  isSale: boolean;

  @Column({ type: 'boolean', default: false })
  isHot: boolean;

  @Column({ type: 'boolean', default: false })
  isNew: boolean;

  @Column({ type: 'boolean', default: false })
  isBestSeller: boolean;

  @Column({ type: 'varchar', length: 100 })
  style: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  roomType: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marble: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lightAndDarkStyle: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  decorateTheItems: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  kindsOfLargeObjects: string;

  @Column({ type: 'text' })
  @ObjectTransformToString()
  @StringTransformToObject()
  additionalInformation: string;

  // Relation

  @OneToMany(() => ProductCategoryEntity, (product) => product.product, {
    onDelete: 'CASCADE',
  })
  productCategories: ProductCategoryEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.product, {
    onDelete: 'CASCADE',
  })
  carts: CartEntity[];

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product, {
    onDelete: 'CASCADE',
  })
  orderProducts: OrderProductEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product, {
    onDelete: 'CASCADE',
  })
  reviews: ReviewEntity[];
}
