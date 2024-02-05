import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Office } from '../office/Office.entity';
import { Review } from '../review/Review.entity';
import { Localization } from '../location/localization.entity';

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

  @Column()
  password: string;

  @Column({ default: false })
  isAccountValidate: boolean;

  @Column({ default: false })
  dniValidate: boolean;

  @Column()
  numberPhone: string;

  @Column({ type: 'date' })
  birthday: Date;

  @ManyToOne(() => Localization, (localization) => localization.users)
  localization: Localization;

  @ManyToMany(() => Office)
  @JoinTable()
  offices: Office[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
