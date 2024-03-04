import { ImagePost } from '../image/imagePost.entity';
import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 *  * Represents a Post entity.
 */
@Entity()
export class Post {
  /**
   * The unique identifier of the post.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The title of the post.
   */
  @Column()
  title: string;

  /**
   * The description of the post.
   */
  @Column()
  description: string;

  /**
   * The creation date of the post.
   */
  @CreateDateColumn()
  creationDate: Date;

  /**
   * Indicates whether the post is closed.
   */
  @Column({ default: false })
  itClosed: boolean;

  /**
   * The search vector of the post.
   */
  @Column({ type: 'tsvector', select: false })
  searchVector: string;

  /**
   * The price estimated of the post.
   */
  @Column({ type: 'money', default: 0 })
  price?: number;

  /**
   * The images of the post.
   */
  @OneToMany(() => ImagePost, imagePost => imagePost.post)
  images: ImagePost[];

  /**
   * The user who created the post.
   */
  @ManyToOne(() => User, user => user.posts)
  user: User;

  /**
   * The users who suscribed to the post.
   */
  @ManyToMany(() => User)
  @JoinTable()
  suscribers: User[];
}
