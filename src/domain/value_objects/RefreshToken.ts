import { generate as generatePassword } from 'generate-password';
import moment from 'moment';

export class RefreshToken {
  private token: string;
  private validUntil: Date;

  private constructor(
    token: string,
    validUntil: Date,
  ) {
    this.token = token;
    this.validUntil = validUntil;
  }

  public static load(token: string, validUntil: Date): RefreshToken {
    return new RefreshToken(token, validUntil)
  }

  public static generate(): RefreshToken {
    const raw = generatePassword({
      length: 20,
      numbers: true
    })

    return new RefreshToken(raw, moment().add(7, 'day').toDate())
  }

  public isValid(): boolean {
    return this.validUntil < new Date()
  }

  public getToken(): string {
    return this.token;
  }

  public getValidUntil(): Date {
    return this.validUntil;
  }

  public update(token: string, validUntil: Date) {
    this.token = token;
    this.validUntil = validUntil;
  }

  public clean() {
    this.token = null;
    this.validUntil = null;
  }
}