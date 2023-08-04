import * as path from 'path';
import { promises } from 'fs';
import { diskStorage } from 'multer';
import {
  nanoid,
  alphabetNumber,
  alphabetLowerCaseLetters,
} from 'src/core/utils/nanoid.util';

const UPLOADS_DIR = './uploads';

async function ensureDirectoryExists(directory: string) {
  try {
    await promises.access(directory);
  } catch (error) {
    try {
      await promises.mkdir(directory, { recursive: true });
    } catch (mkdirError) {
      throw mkdirError;
    }
  }
}

export function fileStorage(dirName: string) {
  return diskStorage({
    destination: async function (req, file, cb) {
      const uploadDir = path.join(UPLOADS_DIR, dirName);
      try {
        await ensureDirectoryExists(uploadDir);
      } catch (error) {
        return cb(error, null);
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const filename = nanoid(alphabetNumber + alphabetLowerCaseLetters, 16);
      const extname = path.extname(file.originalname);
      cb(null, filename + extname);
    },
  });
}
