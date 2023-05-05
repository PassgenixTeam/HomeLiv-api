import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';
import { RegisterDto } from './dto/request/register.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from 'src/modules/auth/dto/response/login-reponse.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    description: `<b ạdjkqwjdkqwdjkw>Example:</b><br>
    <code>
      qdqwd
    </code>
    `,
  })
  @ApiOkResponse({
    description: 'The record has been successfully login.',
    type: LoginResponseDto,
  })
  login(@Body() input: LoginDto) {
    return this.authService.login(input);
  }

  @Post('register')
  register(@Body() input: RegisterDto) {
    return this.authService.register(input);
  }

  @Get('refresh-token')
  refreshToken(@Headers('refresh') token: string) {
    return this.authService.refreshToken(token);
  }

  @Get('logout')
  logout() {
    return this.authService.logout();
  }
}
