import {
  Get,
  Post,
  Body,
  Param,
  Patch,
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
import { CreatePostWithSeoDto } from './dtos/create-post.dto';
import { UpdatePostWithSeoDto } from './dtos/update-post.dto';

@ApiBearerAuth()
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsSerice: PostsService) {}

  @ApiCraetePost()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreatePostWithSeoDto, @GetUser('_id') _id: string) {
    return this.postsSerice.create(_id, body);
  }

  @ApiUpdatePost()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Body() body: UpdatePostWithSeoDto,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return this.postsSerice.update(id, body);
  }

  @ApiGetOnePost()
  @UseGuards(AuthGuard)
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsSerice.findOneById(id);
  }
}
