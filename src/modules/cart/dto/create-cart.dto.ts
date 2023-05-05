import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  })
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  quantity: number;
}
