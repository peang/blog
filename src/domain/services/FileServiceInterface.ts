import { Readable } from "stream";

export interface FileServiceInterface {
  baseUrl: string;

  upload(category: string, file: Express.Multer.File): Promise<{
    filename: string,
    size: number,
    mimetype: string,
    etag: any,
    bucket: any,
    key: string,
    location: string
    path: string
  }>;

  getOne(fileId: string): Promise<Readable>;

  deleteOne(fileId: string): any;

  buildUrl(path: string, transform?: { width: number, height: number }): string;
}