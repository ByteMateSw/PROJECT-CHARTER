import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
//import { StateHiring } from './state/stateHiring.entity';
import { HistoryDate } from './history/historyDate.entity';
import { Review } from '../review/review.entity';
import { StateEnum } from './enums/state.enum';

@Entity()
export class Hiring {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'date' })
  dateApplication: Date;

  @Column()
  state: StateEnum;

  @ManyToMany(() => HistoryDate)
  @JoinTable()
  historyDate: HistoryDate[];

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'contractorId' })
  contractor: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'contractedId' })
  contracted: User;

  @OneToOne(() => Review, (review) => review.id, { nullable: true })
  review: Review;
}
