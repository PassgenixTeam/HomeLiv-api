import { ResponseDto } from '@app/common/base/response.base';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ProfileDto } from 'src/modules/user/dto/response/profile-response.dto';

class TokenDto {
  @Expose()
  @ApiResponseProperty({ type: String, example: 'accessToken' })
  accessToken: string;

  @Expose()
  @ApiResponseProperty({ type: String, example: 'refreshToken' })
  refreshToken: string;

  @Expose()
  @ApiResponseProperty({ type: String, example: 'expiredIn' })
  expiredIn: string;
}

export class LoginDataDto {
  @Expose()
  @ApiResponseProperty({ type: ProfileDto })
  user: ProfileDto;

  @Expose()
  @ApiResponseProperty({ type: TokenDto })
  token: TokenDto;
}

export class LoginResponseDto extends ResponseDto {
  @ApiResponseProperty({ type: LoginDataDto })
  data: LoginDataDto;
}
