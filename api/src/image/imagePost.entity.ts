import { Post } from 'src/post.ts/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImagePost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea' })
  imageData: Buffer;

  @ManyToOne(()=> Post, (post) => post.images)
  post: Post;
}
