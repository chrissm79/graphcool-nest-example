import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Modules } from './modules';

@Module({
  modules: [...Modules],
  imports: [GraphQLModule]
})
export class ApplicationModule {}
