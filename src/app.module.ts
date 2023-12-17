import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { ItemsModule } from "./modules/items/items.module";
import { NotificationModule } from "./modules/notification/notification.module";
import { CommentModule } from "./modules/comment/comment.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import SequelizeConfigService from "./config/database";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    AuthModule,
    ItemsModule,
    NotificationModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: "items", method: RequestMethod.GET })
      .forRoutes("items");
  }
}
