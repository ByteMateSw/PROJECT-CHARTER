import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Office } from '../office/office.entity';
import { Review } from '../review/review.entity';
import { Post } from '../post/post.entity';
import { Role } from '../role/role.entity';
import { City } from '../city/city.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false, select: false })
  isAccountValidate: boolean;

  @Column({ default: false, select: false })
  dniValidate: boolean;

  @Column({ default: false, select: false })
  isDeleted: boolean;

  @Column()
  numberPhone: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ default: false })
  acceptedToS: boolean;

  @Column()
  dni: string;

  @Column({ select: false, nullable: true })
  refreshToken: string;

  @Column({ type: 'bytea', nullable: true })
  photo: Buffer;

  @ManyToOne(() => City, city => city.users)
  city: City;

  @ManyToMany(() => Office)
  @JoinTable()
  offices: Office[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @ManyToOne(() => Role, role => role.user)
  role: Role;
}
