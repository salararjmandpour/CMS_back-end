import { StatusEnum } from 'src/modules/sheets/schema/sheet.schema';

export interface CreateSheetInput {
  title: string;
  description: string;
  writer: string;
  status: StatusEnum;
  image: string;
}
