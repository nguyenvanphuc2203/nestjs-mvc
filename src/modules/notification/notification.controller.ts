import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { CreateNotificationDto } from "./dto/notification.dto";
import { NotificationService } from "./notification.service";
import { Notification } from "./interfaces/notification.interface";

@Controller("items")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  findAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id): Promise<Notification> {
    return this.notificationService.findOne(id);
  }
}
