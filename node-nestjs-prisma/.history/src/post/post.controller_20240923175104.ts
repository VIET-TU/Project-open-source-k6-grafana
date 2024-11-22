import { Controller } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly userService: PostService) {}
}

// controller lam viec chinh thuc voi dto
