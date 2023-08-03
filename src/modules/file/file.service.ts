import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  promises as fs,
  ReadStream,
  createReadStream,
  Stats,
  constants as fileConstant,
} from 'fs';

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
}
