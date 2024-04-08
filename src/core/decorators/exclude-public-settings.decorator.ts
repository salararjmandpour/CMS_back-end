import { SetMetadata } from '@nestjs/common';

export const EXCLUDE_PUBLIC_SETTING_KEY = 'excluedPublicSettings';
export const ExcludePublicSettings = () =>
  SetMetadata(EXCLUDE_PUBLIC_SETTING_KEY, true);
