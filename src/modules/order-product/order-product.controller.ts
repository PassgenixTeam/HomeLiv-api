import { Controller } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order Product')
@Controller('order-product')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}
}
