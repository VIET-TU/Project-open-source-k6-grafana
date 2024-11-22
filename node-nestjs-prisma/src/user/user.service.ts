import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async save(userDto: UserDto): Promise<UserDto> {
    const savedUser = await this.userRepository.save(userDto);
    return plainToClass(UserDto, savedUser, {
      excludeExtraneousValues: true,
    });
  }
  async update(id: string, userDto: UserDto): Promise<{ result: string }> {
    const updatedUser = await this.userRepository.update(id, userDto);
    return { result: 'update success' };
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    return plainToClass(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async delete(id: string): Promise<{ result: string }> {
    const result = this.userRepository.delete(id);
    return { result: 'delete success' };
  }
}
