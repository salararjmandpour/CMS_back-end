import * as path from 'path';
import { promises } from 'fs';
import { diskStorage } from 'multer';
import {
  alphabetLetters,
  alphabetNumber,
  nanoid,
} from 'src/core/utils/nanoid.util';

export function fileStorage(dirName: string) {
  return diskStorage({
    destination: async function (req, file, cb) {
      const path = `./uploads/${dirName}`;

      try {
        const state = await promises.stat(path);
        if (!state.isDirectory()) {
          await promises.mkdir(path);
        }
      } catch (error) {
        await promises.mkdir(path);
      } finally {
        cb(null, path);
      }
    },
    filename: function (req, file, cb) {
      const filename = nanoid(alphabetNumber + alphabetLetters, 16);
      console.log({ fileOriginalname: file.originalname });
      const extname = path.extname(file.originalname);
      cb(null, filename + extname);
    },
  });
}
