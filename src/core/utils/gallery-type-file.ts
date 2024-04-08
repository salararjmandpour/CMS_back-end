const defaultAllowedTypes = ['image', 'video', 'audio', 'application'];

export const getTypeFile = (
  mimetype: string,
  allowedTypes: string[] = defaultAllowedTypes,
): string => {
  const typeMap: Record<string, string> = {};
  allowedTypes.forEach((type) => {
    typeMap[`${type}/`] = type;
  });
  const type = allowedTypes.find((type) => mimetype.startsWith(`${type}/`));
  console.log('test ', mimetype, typeMap);
  return type ? typeMap[`${type}/`].replace('application', 'file') : 'unknown';
};
