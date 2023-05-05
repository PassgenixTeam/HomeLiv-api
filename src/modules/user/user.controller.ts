import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth, AuthUser } from '@app/core';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ROLE } from '@app/common';
import { UpdateUserDto } from 'src/modules/user/dto/request/update-user.dto';
import { ProfileResponseDto } from 'src/modules/user/dto/response/profile-response.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Auth()
  // @Get('me')
  // me(@AuthUser() user: any) {
  //   return this.userService.me(user);
  // }

  @Auth()
  @Get('profile')
  @ApiOkResponse({
    description: 'The record has been successfully get all.',
    type: ProfileResponseDto,
  })
  profile(@AuthUser('id') userId: string) {
    return this.userService.profile(userId);
  }

  @Patch()
  @Auth()
  update(@Body() updateUserDto: UpdateUserDto, @AuthUser('id') userId: string) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':id')
  @Auth(ROLE.ADMIN)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
