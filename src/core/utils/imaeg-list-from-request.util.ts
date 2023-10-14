export const listOfImagesFromRequest = (files: Express.Multer.File[] = []) => {
  return files
    .filter((file: Express.Multer.File) => Boolean(file && file.path))
    .map((file: Express.Multer.File) => file.path.replace(/\\/g, '/'));
};
