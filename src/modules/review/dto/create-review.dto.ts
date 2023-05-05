import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ type: String, example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, example: 'abc@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, example: 'This is a review' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: String, example: '5' })
  @IsNotEmpty()
  rating: number;
}
