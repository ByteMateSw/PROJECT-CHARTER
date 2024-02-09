import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hiring } from '../Hiring.entity';

@Entity()
export class StateHiring {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Hiring, (hiring) => hiring.state)
  hiring: Hiring[];
}
