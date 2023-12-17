import { Column, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../../auth/schemas/user.model";

@Table
export class Item extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  view: number;

  @Column
  hhaha: number;

  @Column({ defaultValue: true })
  isActive: boolean;

  @ForeignKey(() => User)
  @Column
  userId: number;

  // @BelongsTo(() => User)
  // user: User
}
