import * as path from 'path';
import {
  promises as fs,
  ReadStream,
  createReadStream,
  Stats,
  constants as fileConstant,
  existsSync,
  unlinkSync,
} from 'fs';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class FileService {
  constructor() {}

  getFile(targetPath: string): ReadStream {
    return createReadStream(targetPath);
  }

  async getFileStats(targetPath: string): Promise<Stats> {
    try {
      return await fs.stat(targetPath);
    } catch (error) {
      throw new NotFoundException('File not found.');
    }
  }

  async removeFileByPath(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      throw new NotFoundException('File not found.');
    }
  }

  deleteFileByPath(fileAddress: string) {
    if (fileAddress) {
      const pathFile = path.join(fileAddress);
      if (existsSync(pathFile)) unlinkSync(pathFile);
    }
  }

  async createDirectory(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      throw new BadRequestException('Error creating directory.');
    }
  }

  async checkFileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath, fileConstant.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  async uploadImage(imagePath: string, targetPath: string): Promise<void> {
    try {
      await fs.copyFile(imagePath, targetPath);
    } catch (error) {
      throw new BadRequestException('Error uploading image.');
    }
  }
}
