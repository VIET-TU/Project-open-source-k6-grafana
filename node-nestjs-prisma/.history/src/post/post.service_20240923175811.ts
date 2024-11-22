import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}
  async getPosts() {
    return await this.postRepository.find();
  }
  async getPost(id: int) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    return post;
  }
}
