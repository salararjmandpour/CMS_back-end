import {
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SheetsService } from './sheets.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { GetUser } from 'src/core/decorators/get-user-param.decorator';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';

import { ApiCreateSheet } from './docs/create-sheet.doc';
import { ApiUpdateSheet } from './docs/update-sheet.doc';
import { CreateSheetWithSeoDto } from './dtos/create-sheet.dto';
import { UpdateSheetWithSeoDto } from './dtos/update-sheet.dto';

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

  @ApiUpdateSheet()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Body() body: UpdateSheetWithSeoDto,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return this.sheetsService.update(id, body);
  }
}
