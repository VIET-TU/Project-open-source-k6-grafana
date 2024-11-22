import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly userService: PostService) {}

  @Get()
  async getPosts() {
    return await this.userService.getPosts();
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    return await this.userService.getPost(id);
  }

  @Post()
  async createPost(@Body() post: PostDto) {
    return await this.userService.getPost(id);
  }

  @Patch(':id')
  async updatePost(@Param('id') id: number, @Body() post: PostDto) {
    return await this.userService.updatePost(id, post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return await this.userService.deletePost(id);
  }
}
