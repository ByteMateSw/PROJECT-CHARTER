import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  description: string;

  @ManyToOne(()=> User, (user) => user.reviews)
  user: User;
}
