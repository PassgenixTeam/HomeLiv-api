import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StripeModule } from '@app/payment';
import { PaypalModule } from '../../libs/payment/src/modules/paypal/paypal.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    // StripeModule,
    // PaypalModule,
    UploadModule,
    ProductModule,
    CategoryModule,
    // ProductCategoryModule,
    CartModule,
    OrderModule,
    ReviewModule,
    // OrderProductModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
