import { City } from 'src/city/city.entity';
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
  Index,
} from 'typeorm';
import { WorkingMode } from './enum/enum.post';

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
  @Index({ fulltext: true })
  searchVector: string;

  @Column({ default: WorkingMode.IN_PERSON })
  working_modality: WorkingMode;

  /**
   * The price estimated of the post.
   */
  @Column({ type: 'money', default: 0 })
  price?: number;

  /**
   * The contact Number
   */
  @Column({ nullable: true })
  contact: string;

  /**
   * the post is valid or not
   */
  @Column({ default: true })
  isValid: boolean;

  /**
   * The city of the post.
   */
  @ManyToOne(() => City, (city) => city.id)
  city?: number;

  /**
   * The images of the post.
   */
  @OneToMany(() => ImagePost, (imagePost) => imagePost.post)
  images?: ImagePost[];

  /**
   * The user who created the post.
   */
  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  user: User;

  /**
   * The users who suscribed to the post.
   */
  @ManyToMany(() => User, (user) => user.subscribers, { eager: true })
  @JoinTable()
  subscribers?: User[];
}
