import { Injectable } from "@nestjs/common";
import { Model } from "pg";
import { Notification } from "./schemas/notification.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification) private readonly itemModel: Model<Notification>
  ) {}

  async findAll(): Promise<Notification[]> {
    return await this.itemModel.findAll();
  }

  async findOne(id: string): Promise<Notification> {
    return await this.itemModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(item: Notification): Promise<Notification> {
    return this.itemModel.create(item);
  }

  async delete(id: string): Promise<Notification> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Notification): Promise<Notification> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
