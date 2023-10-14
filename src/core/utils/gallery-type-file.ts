const defaultAllowedTypes = ['image', 'video', 'audio'];

export const getTypeFile = (
  mimetype: string,
  allowedTypes: string[] = defaultAllowedTypes,
): string => {
  const typeMap: Record<string, string> = {};
  allowedTypes.forEach((type) => {
    typeMap[`${type}/`] = type;
  });
  const type = allowedTypes.find((type) => mimetype.startsWith(`${type}/`));
  return type ? typeMap[`${type}/`] : 'unknown';
};
