import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Province, (province) => province.country)
  provinces: Province[];
}

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

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Province, (province) => province.cities)
  province: Province;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @OneToMany(() => User, (user) => user.city)
  users: User[];
}
