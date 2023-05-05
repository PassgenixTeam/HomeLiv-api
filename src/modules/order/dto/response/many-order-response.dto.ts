import { ROLE, StringTransformToObject } from '@app/common';
import { BaseResponseDto, ResponseDto } from '@app/common/base/response.base';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ORDER_STATUS } from 'src/modules/order/enums/order.enum';
import {
  AddressDto,
  ShippingAddressDto,
} from 'src/modules/user/dto/request/address.dto';

export class ManyOrderDto extends BaseResponseDto {
  @Expose()
  @ApiResponseProperty({ type: Number, example: 10 })
  subtotal: number;

  @Expose()
  @ApiResponseProperty({ type: Number, example: 10 })
  shippingFee: number;

  @Expose()
  @ApiResponseProperty({ type: Number, example: 10 })
  total: number;

  @Expose()
  @ApiResponseProperty({
    type: String,
    enum: ORDER_STATUS,
    example: ORDER_STATUS.PENDING,
  })
  status: string;
}

export class OrderResponseDto extends ResponseDto {
  @ApiResponseProperty({ type: ManyOrderDto })
  data: ManyOrderDto;
}
