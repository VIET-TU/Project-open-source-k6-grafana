import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'posts',
})
export class PostEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;
}
