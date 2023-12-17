import { Injectable } from '@nestjs/common';
import { Model } from 'pg';
import { Item } from "./schemas/item.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ItemsService {
    constructor(
        @InjectModel(Item) private readonly itemModel: Model<Item>
    ) { }

    async findAll(): Promise<Item[]> {
        return await this.itemModel.findAll();
    }

    async findOne(id: string): Promise<Item> {
        return await this.itemModel.findOne({
            where: {
                id,
            },
        });
    }

    async create(item: Item): Promise<Item> {
        return this.itemModel.create(item);
    }

    async delete(id: string): Promise<Item> {
        return await this.itemModel.findByIdAndRemove(id);
    }

    async update(id: string, item: Item): Promise<Item> {
        return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
    }
}
