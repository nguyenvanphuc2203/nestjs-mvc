import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from "express";
import { UserDto } from "./dto/user.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Get("login")
  async getLogin(@Res() res: Response) {
    return res.render("auth/login", { message: "Hello world!" });
  }

  @Post("register")
  async register(@Body() userDto: UserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 12);

    const [userExit]: any = await this.authService.findOne({
      email: userDto.email,
    });

    if (userExit) {
      throw new BadRequestException("User Exits");
    }

    const user = await this.authService.create({
      name: userDto.name,
      email: userDto.email,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }

  @Post("login")
  async login(
    @Body() userDto: UserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const [user]: any = await this.authService.findOne({
      email: userDto.email,
    });

    if (!user) {
      throw new BadRequestException("invalid credentials");
    }

    if (!(await bcrypt.compare(userDto.password, user.password))) {
      throw new BadRequestException("invalid credentials");
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    // response.cookie('jwt', jwt);

    return {
      message: "success",
      expiredAt: "12312312321",
      accessToken: jwt,
    };
  }

  @Get("users")
  async users(@Req() request: Request) {
    try {
      const users = await this.authService.findAll();

      return users;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get("profile")
  async user(@Req() request: Request) {
    try {
      // const cookie = request.cookies['jwt'];
      const access_token = request.headers.authorization.replace("Bearer ", "");

      const data = await this.jwtService.verifyAsync(access_token);

      if (!data) {
        throw new UnauthorizedException();
      }

      const [user]: any = await this.authService.findOne({ id: data["id"] });

      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("jwt");

    return {
      message: "success",
    };
  }
}
