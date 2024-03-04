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
   * The image data of the ImagePost.
   */
  @Column({ type: 'bytea' })
  imageData: Buffer;

  /**
   * The content type of the ImagePost.
   */
  @Column()
  contentType: string;

  /**
   * The post that the ImagePost belongs to.
   */
  @ManyToOne(() => Post, post => post.images)
  post: Post;
}
