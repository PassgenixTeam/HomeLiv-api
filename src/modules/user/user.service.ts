import { Injectable } from '@nestjs/common';
import { ResponseTransform, removeKeyUndefined, sha512 } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from 'src/modules/user/dto/request/update-user.dto';
import { ProfileDto } from 'src/modules/user/dto/response/profile-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async me(user: UserEntity) {
    delete user.loginSession;
    delete user.cacheId;
    return user;
  }

  @ResponseTransform(ProfileDto)
  async profile(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    delete user.loginSession;
    delete user.cacheId;

    return user;
  }

  findAll() {
    return this.usersRepository.find();
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    const userInstance = plainToInstance(UserEntity, updateUserDto);

    if (updateUserDto.oldPassword) {
      if (sha512(updateUserDto.oldPassword) !== user.password) {
        throw new Error("Password doesn't match");
      }

      if (updateUserDto.newPassword) {
        userInstance.password = sha512(updateUserDto.newPassword);
      }
    }

    removeKeyUndefined(userInstance);

    await this.usersRepository.update(userId, userInstance);

    return 'Updated successfully';
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
