import {
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PostsService } from './posts.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';
import { GetUser } from 'src/core/decorators/get-user-param.decorator';

import { ApiCraetePost } from './docs/craete-post.dto';
import { ApiUpdatePost } from './docs/updaet-post.dto';
import { ApiGetOnePost } from './docs/get-one-sheet.doc';
import { ApiGetPostList } from './docs/get-post-list.doc';
import { CreatePostWithSeoDto } from './dtos/create-post.dto';
import { UpdatePostWithSeoDto } from './dtos/update-post.dto';
import { DeletePostDto } from './dtos/delete-post.dto';

@ApiBearerAuth()
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiCraetePost()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreatePostWithSeoDto, @GetUser('_id') _id: string) {
    return this.postsService.create(_id, body);
  }

  @ApiUpdatePost()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Body() body: UpdatePostWithSeoDto,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return this.postsService.update(id, body);
  }

  @ApiGetPostList()
  @Get()
  getPostsList(
    @Query('status') status: string,
    @Query('search') search: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.postsService.findAll(status, search, startDate, endDate);
  }

  @ApiGetOnePost()
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  deleteMany(@Body() body: DeletePostDto) {
    return this.postsService.deleteMany(body.postIDs);
  }
}
