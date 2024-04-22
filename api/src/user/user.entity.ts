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
import { Notifications } from '../notifications/notifications.entity';

/**
 * Represents a User entity.
 */
@Entity()
export class User {
  /**
   * The unique identifier of the user.
   */
  @PrimaryGeneratedColumn('increment')
  id: number;

  /**
   * The first name of the user.
   */
  @Column()
  firstName: string;

  /**
   * The last name of the user.
   */
  @Column()
  lastName: string;

  /**
   * The email address of the user.
   */
  @Column({ unique: true })
  email: string;

  /**
   * The password of the user.
   */
  @Column({ select: false })
  password: string;

  /**
   * Indicates whether the user's account is validated.
   */
  @Column({ default: false, select: false })
  isAccountValidate: boolean;

  /**
   * Indicates whether the user's DNI is validated.
   */
  @Column({ default: false, select: false })
  dniValidate: boolean;

  /**
   * Indicates whether the user is deleted.
   */
  @Column({ default: false, select: false })
  isDeleted: boolean;

  /**
   * The phone number of the user.
   */
  @Column()
  numberPhone: string;

  /**
   * The birthday of the user.
   */
  @Column({ type: 'date' })
  birthday: Date;

  /**
   * The DNI (National Identity Document) of the user.
   */
  @Column()
  dni: string;

  /**
   * The refresh token of the user.
   */
  @Column({ select: false, nullable: true })
  refreshToken: string;

  /**
   * The photo of the user.
   */
  @Column({ type: 'bytea', nullable: true })
  photo: Buffer;

  /**
   * The city associated with the user.
   */
  @ManyToOne(() => City, city => city.users)
  city: City;

  /**
   * The offices associated with the user.
   */
  @ManyToMany(() => Office)
  @JoinTable()
  offices: Office[];

  /**
   * The reviews made by the user.
   */
  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  /**
   * The posts made by the user.
   */
  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  /**
   * The role of the user.
   */
  @ManyToOne(() => Role, role => role.user)
  role: Role;

  /**
   * The notifications received by the user.
   */
  @OneToMany(() => Notifications, notifications => notifications.user)
  notifications: Notification[];
}
