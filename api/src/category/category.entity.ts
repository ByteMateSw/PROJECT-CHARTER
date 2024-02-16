import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Office } from '../office/office.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Office, (office) => office.category)
  offices: Office[];
}
