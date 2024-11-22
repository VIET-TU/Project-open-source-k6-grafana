import { IsNotEmpty } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
