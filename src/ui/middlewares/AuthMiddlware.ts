import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JWTService } from 'src/application/services/JWTService';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next) {
    const token: string | undefined = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException('TOKEN_NOT_PROVIDED');
    }

    try {
      const tokenPayload = await JWTService.decode(token);
      if (!tokenPayload) {
        throw new UnauthorizedException('TOKEN_NOT_PROVIDED');
      }

      if (tokenPayload.exp < Date.now() / 1000) {
        throw new UnauthorizedException('TOKEN_EXPIRED');
      }

      await JWTService.verifyToken(token, process.env.JWT_SECRET);
    } catch (err) {
      throw err;
    }

    next();
  }
}
