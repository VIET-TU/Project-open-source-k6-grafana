import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly userService: PostService) {}

  @Get()
  hello() {
    return 'Hello lalal wold';
  }
}

// controller lam viec chinh thuc voi dto
