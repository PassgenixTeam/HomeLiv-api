import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddressDto {
  @ApiProperty({ type: String })
  @IsString()
  firstName: string;

  @ApiProperty({ type: String })
  @IsString()
  lastName: string;

  @ApiProperty({ type: String })
  @IsString()
  city: string;

  @ApiProperty({ type: String })
  @IsString()
  country: string;

  @ApiProperty({ type: String })
  @IsString()
  line1: string;

  @ApiProperty({ type: String })
  @IsString()
  line2: string;

  @ApiProperty({ type: String })
  @IsString()
  street: string;

  @ApiProperty({ type: String })
  @IsString()
  phone: string;

  @ApiProperty({ type: String })
  @IsString()
  state: string;

  @ApiProperty({ type: String })
  @IsString()
  zipCode: string;

  @ApiProperty({ type: String })
  @IsString()
  email: string;
}

export class ShippingAddressDto {
  @ApiProperty({ type: String })
  @IsString()
  city: string;

  @ApiProperty({ type: String })
  @IsString()
  country: string;

  @ApiProperty({ type: String })
  @IsString()
  zipCode: string;

  @ApiProperty({ type: String })
  @IsString()
  apartment: string;
}
