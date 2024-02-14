import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { StateHiring } from './state/stateHiring.entity';

@Entity()
export class Hiring {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  dateApplication: Date;

  @ManyToOne(() => StateHiring, (state) => state.hiring)
  state: StateHiring;
  
  @Column({ type: 'date' })
  dateAcceptOrReject: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'contractorId' })
  contractor: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'contractedId' })
  contracted: User;
}
