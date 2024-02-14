import { User } from '../user/user.entity';
import { Province } from '../province/province.entity';

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Province, (province) => province.cities)
  province: Province;

  @OneToMany(() => User, (user) => user.city)
  users: User[];
}
