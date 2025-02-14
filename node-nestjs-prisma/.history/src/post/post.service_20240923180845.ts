import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { NotFoundError } from 'rxjs';
import { PostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}
  async getPosts() {
    return await this.postRepository.find();
  }
  async getPost(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    return post;
  }
  async createPost(title: string, content: string) {
    return await this.postRepository.create({ title, content });
  }
  async updatePost(id: number, post: PostDto) {
    return await this.postRepository.update(id, {
      title: post.title,
      content: post.content,
    });
  }
}
