import { Column, Entity, OneToMany } from 'typeorm';
import { SessionEntity } from '../../session/entities/session.entity';
import {
  BaseEntity,
  ObjectTransformToString,
  ROLE,
  StringTransformToObject,
} from '@app/common';
import { Expose } from 'class-transformer';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { OrderEntity } from 'src/modules/order/entities/order.entity';
import { ReviewEntity } from 'src/modules/review/entities/review.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 500 })
  password: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 255,
    default:
      // eslint-disable-next-line max-len
      'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=',
  })
  avatarUrl: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.FREELANCE })
  role: ROLE;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @ObjectTransformToString()
  @StringTransformToObject()
  address: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  @ObjectTransformToString()
  @StringTransformToObject()
  shippingAddress: string;

  @Expose()
  loginSession: SessionEntity;

  @Expose()
  cacheId: string;

  // Relation
  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.user, {
    onDelete: 'CASCADE',
  })
  carts: CartEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user, {
    onDelete: 'CASCADE',
  })
  orders: OrderEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user, {
    onDelete: 'CASCADE',
  })
  reviews: ReviewEntity[];
}
