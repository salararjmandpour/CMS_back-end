import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
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
import { ApiGetSheetList } from './docs/get-sheet-list.doc';
import { CreateSheetWithSeoDto } from './dtos/create-sheet.dto';
import { UpdateSheetWithSeoDto } from './dtos/update-sheet.dto';
import { ApiGetOneSheet } from './docs/get-one-sheet.doc';

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

  @ApiGetSheetList()
  @Get()
  getSheetsList(
    @Query('status') status: string,
    @Query('search') search: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.sheetsService.findAll(status, search, startDate, endDate);
  }

  @ApiGetOneSheet()
  @Get(':id')
  getSheetById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.sheetsService.findOneById(id);
  }
}
