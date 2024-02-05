import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Localization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  @OneToMany(()=> User, (user)=> user.localization)
  users: User[];
}
