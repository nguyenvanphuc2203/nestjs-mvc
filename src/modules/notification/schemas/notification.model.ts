import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { User } from "../../auth/schemas/user.model";
import { Comment } from "../../comment/schemas/comment.model";

@Table
export class Notification extends Model {
  @Column
  name: string;

  @Column
  title: string;

  @Column
  content: string;

  @Column
  view: number;

  @Column({ defaultValue: true })
  isActive: boolean;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comment: Comment[];
}
