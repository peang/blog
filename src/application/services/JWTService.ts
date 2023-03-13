import * as bcrypt from 'bcryptjs';
import { generate as generateString } from 'generate-password';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

const salt = 10;
const refreshLength = 50;
const refreshLifeTime = 2592000; // seconds, equal to 30 days

export class JWTService {
  static async generateToken(payload: Record<string, unknown>, secret: string, scope: string): Promise<string> {
    return jwt.sign({
      iss: "api.bukabengkel.id",
      sub: "bukabengkel.id",
      aud: "api.bukabengkel.id",
      nbf: moment().unix(),
      iat: moment().unix(),
      payload,
      scope,
    }, String(secret), { expiresIn: Number(process.env.JWT_LIFETIME) });
  }

  static async verifyToken(token: string, secret: any) {
    return jwt.verify(token, String(secret));
  }

  static decode(token: string): any {
    return jwt.decode(token);
  }

  static async generateRefreshToken(): Promise<{
    token: string,
    valid_until: Date,
  }> {
    const lifetime = process.env.JWT_REFRESH_LIFETIME ? process.env.JWT_REFRESH_LIFETIME : refreshLifeTime;
    return {
      token: generateString({ length: refreshLength }),
      valid_until: moment().add(lifetime, 'seconds').toDate(),
    };
  }

  static async generateHash(password: string): Promise<string> {
    return bcrypt.hashSync(password, salt);
  }
}