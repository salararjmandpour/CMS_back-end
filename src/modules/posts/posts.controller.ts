import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { PostsService } from './posts.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiCraetePost } from './docs/craete-post.dto';
import { CreatePostWithSeoDto } from './dtos/create-post.dto';
import { GetUser } from 'src/core/decorators/get-user-param.decorator';

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
}
