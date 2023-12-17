import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, ".", "views"));
  app.setViewEngine("ejs");

  // const config = new DocumentBuilder()
  //   .setTitle("API Schema")
  //   .setDescription("The API description")
  //   .setVersion("1.0")
  //   .addTag("API")
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup("swagger", app, document);

  await app.listen(3001);
}
bootstrap();
