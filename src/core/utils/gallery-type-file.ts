/**
 * get type file from extname
 * @param extensions allowed extensions
 * @param filename file name
 */
export const getTypeFile = (
  extensions: { [key: string]: string },
  extname: string,
) => extensions[extname];
