import { Country } from 'src/country/country.entity';
import { City } from 'src/city/city.entity';

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Country, (country) => country.provinces)
  country: Country;

  @OneToMany(() => City, (city) => city.province)
  cities: City[];
}
