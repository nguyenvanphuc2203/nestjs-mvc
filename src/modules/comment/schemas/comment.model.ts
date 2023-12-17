import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../../auth/schemas/user.model";
import { Notification } from "../../notification/schemas/notification.model";

@Table
export class Comment extends Model {
  @Column
  name: string;

  @Column
  title: string;

  @Column
  content: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Notification)
  notificationId: number;

  @BelongsTo(() => Notification)
  notification: Notification;
}
