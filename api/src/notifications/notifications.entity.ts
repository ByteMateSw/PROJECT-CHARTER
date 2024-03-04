import { User } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Represents a Notifications entity.
 */
@Entity()
export class Notifications {
  /**
   * The unique identifier of the notification.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The title of the notification.
   */
  @Column()
  title: string;

  /**
   * The description of the notification.
   */
  @Column()
  description: string;

  /**
   * The creation time of the notification.
   */
  @Column()
  creationTime: Date;

  /**
   * The expiration time of the notification.
   */
  @Column()
  expireAt: Date;

  /**
   * Indicates whether the notification is deleted.
   */
  @Column({ default: false })
  isDeleted: boolean;

  /**
   * The user that the notification belongs to.
   */
  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}
