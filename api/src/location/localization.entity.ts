import { User } from '../user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Localization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  capital: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @OneToMany(() => User, (user) => user.localization)
  users: User[];
}
