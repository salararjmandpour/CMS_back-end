import { StatusEnum } from 'src/modules/sheets/schema/sheet.schema';

export interface CreateSheetInput {
  title: string;
  description: object[];
  writer: string;
  status: StatusEnum;
  image: string;
}

export interface UpdateSheetInput extends Omit<CreateSheetInput, 'writer'> {}
