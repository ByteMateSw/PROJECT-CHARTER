import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
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
  @Column()
  score: number;

  /**
   * The description of the review.
   */
  @Column()
  description: string;

  /**
   * The user who created the review.
   */
  @ManyToOne(() => User, user => user.reviews)
  user: User;

  /**
   * The hiring associated with the review.
   */
  @OneToOne(() => Hiring, hiring => hiring.id, { nullable: true })
  hiring: Hiring;
}
