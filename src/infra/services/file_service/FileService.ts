import { InternalServerErrorException } from "@nestjs/common";
import { FileServiceInterface } from "../../../domain/services/FileServiceInterface";

export const ALLOWED_TYPES = ['image/jpeg', 'image/png']
export const ALLOWED_CATEGORIES = ['products', 'profile']

export enum FILE_CATEGORY {
  PRODUCT = 'products'
}

export class FileService {
  public static baseUrl: string;
  public static instance: FileServiceInterface;

  constructor() {
    switch (process.env.STORAGE_SERVICE) {
      // Init Adapters
      default:
        throw new InternalServerErrorException('INVALID_STORAGE_SERVICE')
    }
    FileService.baseUrl = FileService.instance.baseUrl;
    return FileService.instance;
  }

  public static buildUrl(path: string, transform: { width: number, height: number } = null) {
    if (process.env.CDN && process.env.CDN === 'true') {
      if (transform) {
        return `${process.env.CDN_BASE_URL}/${path}?tr=w-${transform.width},h-${transform.height}`;
      }

      return `${process.env.CDN_BASE_URL}/${path}`;
    } else {
      return `${FileService.baseUrl}/${path}`;
    }
  }
}