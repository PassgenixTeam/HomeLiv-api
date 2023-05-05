import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Length, ValidateNested } from 'class-validator';
import {
  AddressDto,
  ShippingAddressDto,
} from 'src/modules/user/dto/request/address.dto';

export class CreateUserDto {
  @ApiProperty({ type: String })
  firstName: string;

  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({ type: String })
  avatarUrl: string;

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty({ type: ShippingAddressDto })
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @ApiProperty({ type: String })
  @Length(8)
  oldPassword: string;

  @ApiProperty({ type: String })
  @Length(8)
  newPassword: string;
}
