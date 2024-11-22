import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly userRepository: Repository<PostEntity>,
  ) {}
}
