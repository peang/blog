import { generate as generatePassword } from 'generate-password';
import * as moment from 'moment';

export class Token {
  private token: string;
  private validUntil: Date;

  private constructor(
    token: string,
    validUntil: Date,
  ) {
    this.token = token;
    this.validUntil = validUntil;
  }

  public static create(token: string, validUntil: Date): Token {
    return new Token(token, validUntil)
  }

  public static generate(): Token {
    const raw = generatePassword({
      length: 20,
      numbers: true
    })

    return new Token(raw, moment().add(1, 'hour').toDate())
  }

  public isValid(): boolean {
    return this.validUntil > moment().toDate()
  }

  public getToken(): string {
    return this.token;
  }

  public getValidUntil(): Date {
    return this.validUntil;
  }
}