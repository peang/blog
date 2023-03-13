import { BadRequestException } from "@nestjs/common";

export class BlogNotFoundException extends BadRequestException {
  constructor() {
    super('BLOG_NOT_FOUND')
  }
}