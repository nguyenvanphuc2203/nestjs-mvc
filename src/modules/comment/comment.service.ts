import { Injectable } from "@nestjs/common";
import { Model } from "pg";
import { Comment } from "./schemas/comment.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private readonly itemModel: Model<Comment>
  ) {}

  async findAll(): Promise<Comment[]> {
    return await this.itemModel.findAll();
  }

  async findOne(id: string): Promise<Comment> {
    return await this.itemModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(item: Comment): Promise<Comment> {
    return this.itemModel.create(item);
  }

  async delete(id: string): Promise<Comment> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Comment): Promise<Comment> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
