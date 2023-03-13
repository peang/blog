import { createParamDecorator, Injectable, NestMiddleware } from '@nestjs/common';
import { JWTService } from './../../application/services/JWTService';
import { UserContext } from './../../application/types/context';

export const Context = createParamDecorator(async (): Promise<UserContext> => {
  return ContextMiddleware.UserContext
});

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  static UserContext: UserContext;

  async use(req: any, res: any, next) {
    const token: string | undefined = req.headers.authorization;
    if (!token) {
      next();
    }

    this.setUserContext(token)

    next();
  }

  setUserContext(token: string) {
    const decoded = JWTService.decode(token);
    
    console.log(decoded)
    ContextMiddleware.UserContext = {
      id: decoded.payload.id,
      name: decoded.payload.name,
    }
  }
}
