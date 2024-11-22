import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @Expose()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @Expose()
  @Transform(({ obj }) => obj.firstName + ' ' + obj.lastName)
  fullName: string;

  @Expose()
  @IsNotEmpty()
  isActive: boolean;
}
