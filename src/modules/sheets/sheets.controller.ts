import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { SheetsService } from './sheets.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiCreateSheet } from './docs/create-sheet.doc';
import { CreateSheetWithSeoDto } from './dtos/create-sheet.dto';
import { GetUser } from 'src/core/decorators/get-user-param.decorator';

@ApiBearerAuth()
@ApiTags('Sheets')
@Controller('sheets')
export class SheetsController {
  constructor(private sheetsService: SheetsService) {}

  @ApiCreateSheet()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreateSheetWithSeoDto, @GetUser('_id') _id: string) {
    return this.sheetsService.create(_id, body);
  }
}
