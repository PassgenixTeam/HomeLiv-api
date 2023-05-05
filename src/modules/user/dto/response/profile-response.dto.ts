import { ROLE, StringTransformToObject } from '@app/common';
import { BaseResponseDto, ResponseDto } from '@app/common/base/response.base';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  AddressDto,
  ShippingAddressDto,
} from 'src/modules/user/dto/request/address.dto';

export class ProfileDto extends BaseResponseDto {
  @Expose()
  @ApiResponseProperty({ type: String, example: 'John' })
  firstName: string;

  @Expose()
  @ApiResponseProperty({ type: String, example: 'Wick' })
  lastName: string;

  @Expose()
  @ApiResponseProperty({ type: String, example: 'url' })
  avatarUrl: string;

  @Expose()
  @ApiResponseProperty({ type: String, example: true })
  isActive: boolean;

  @Expose()
  @ApiResponseProperty({ type: String, example: ROLE.CLIENT })
  role: ROLE;

  @Expose()
  @ApiResponseProperty({ type: AddressDto })
  @StringTransformToObject({ toClassOnly: true })
  address: AddressDto;

  @Expose()
  @ApiResponseProperty({ type: ShippingAddressDto })
  @StringTransformToObject({ toClassOnly: true })
  shippingAddress: ShippingAddressDto;
}

export class ProfileResponseDto extends ResponseDto {
  @ApiResponseProperty({ type: ProfileDto })
  data: ProfileDto;
}
