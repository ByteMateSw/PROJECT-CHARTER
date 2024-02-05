import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Office } from '../office/Office.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Office, (office) => office.category)
  offices: Office[];
}
