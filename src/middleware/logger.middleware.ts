import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // const token = req.cookies['jwt'];
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    console.log(token)
    if(!token){
        throw new UnauthorizedException();
    }
    next();
  }
}
