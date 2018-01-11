import { Module } from '@nestjs/common';
import { GraphcoolModule } from '../graphcool/graphcool.module';
import { PostController } from './post.controller';
import { PostResolver } from './post.resolver';

@Module({
  components: [PostResolver],
  controllers: [PostController],
  imports: [GraphcoolModule]
})
export class PostModule {}
