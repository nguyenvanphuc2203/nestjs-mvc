import { Injectable } from '@nestjs/common';
import { Model } from 'pg';
import { User } from "./schemas/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { Item } from '../items/schemas/item.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private readonly userModel: Model<User>
    ) {
    }

    async findAll(): Promise<User> {
        return this.userModel.findAll({
            include: [{
                model: Item,
                attributes: ['name', 'description']
            }]
        });
    }

    async create(data: any): Promise<User> {
        return this.userModel.create(data);
    }

    async findOne(condition: any): Promise<User> {
        return this.userModel.findAll({
            where: condition,
            include: [{
                model: Item,
                attributes: ['name', 'description']
            }]
        });
    }
}