import { Column, Model, Table, HasMany } from "sequelize-typescript";
import { Item } from "../../items/schemas/item.model";
import { Comment } from "../../comment/schemas/comment.model";

@Table
export class User extends Model {
  @Column
  name: string;

  @Column({ unique: true })
  email: string;

  @Column
  phone: string;

  @Column
  password: string;

  @Column({ defaultValue: 0 })
  coin: number;

  @HasMany(() => Item)
  items: Item[];

  @HasMany(() => Comment)
  commnent: Comment[];
}
