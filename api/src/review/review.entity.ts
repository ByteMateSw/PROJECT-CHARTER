import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Hiring } from '../hiring/hiring.entity';

@Entity()
/**
 * Represents a review entity.
 */
export class Review {
  /**
   * The unique identifier of the review.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The score given in the review.
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  score: number;

  /**
   * The description of the review.
   */
  @Column()
  description: string;

  /**
   * the reviewed user.
   */
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  /**
   * The user who created the review.
   */
  @ManyToOne(() => User, (user) => user.reviews)
  contractor: User;

  /**
   * The hiring associated with the review.
   */
  @OneToOne(() => Hiring, (hiring) => hiring.id, { nullable: true })
  @JoinColumn()
  hiring: string;
}
