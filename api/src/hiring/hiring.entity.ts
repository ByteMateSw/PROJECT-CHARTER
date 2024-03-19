import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { StateHiring } from './state/stateHiring.entity';
import { HistoryDate } from './history/historyDate.entity';

@Entity()
export class Hiring {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  dateApplication: Date;

  @ManyToOne(() => StateHiring, (state) => state.hiring)
  state: StateHiring;

  @ManyToMany(() => HistoryDate)
  @JoinTable()
  historyDate: HistoryDate[];

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'contractorId' })
  contractor: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'contractedId' })
  contracted: User;
}