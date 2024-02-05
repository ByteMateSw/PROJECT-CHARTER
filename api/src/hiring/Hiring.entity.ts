import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Hiring {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  dateApplication: Date;

  @Column({ type: 'date' })
  dateAcceptance: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'contractorId' })
  contractor: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'contractedId' })
  contracted: User;
}
