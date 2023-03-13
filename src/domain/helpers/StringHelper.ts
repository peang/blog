import { generate as generatePassword } from 'generate-password';
import slugify from 'slugify';

export class StringHelper {
  public static generateRandomString(length: number) {
    return generatePassword({
      length,
      numbers: true
    })
  }

  public static generateOTP(): string {
    return (Math.floor(100000 + Math.random() * 900000)).toString();
  }

  public static generateSlug(title: string): string {
    return slugify(title);
  }

  public static cleanobject(object) {
    for (const propName in object) {
      if (object[propName] === null || object[propName] === undefined) {
        delete object[propName];
      }
    }
    return object
  }

  public static stringfyObject(object) {
    Object.keys(object).forEach((key: string): void => {
      object[key] = String(object[key]);
    });
    return object;
  }
}