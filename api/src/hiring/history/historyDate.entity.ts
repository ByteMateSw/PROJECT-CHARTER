import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HistoryDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  dateofChange: Date;
}
