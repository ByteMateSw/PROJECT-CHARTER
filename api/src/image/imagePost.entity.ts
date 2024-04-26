import { Post } from '../post/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Represents the ImagePost entity of the application.
 */
@Entity()
export class ImagePost {
  /**
   * The unique identifier for the ImagePost.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The filename of the image
   */
  @Column()
  filename: string;

  /**
   * The post that the ImagePost belongs to.
   */
  @ManyToOne(() => Post, post => post.images)
  post: Post;
}
