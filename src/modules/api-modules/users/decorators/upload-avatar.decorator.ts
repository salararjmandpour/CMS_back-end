import { Post, applyDecorators } from '@nestjs/common';

export const UploadAvatarDecorator = () => {
  return applyDecorators(Post(':id'));
};
