import { Module } from '@nestjs/common';
import { GraphcoolModule } from '../graphcool/graphcool.module';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';

@Module({
  components: [UserResolver],
  controllers: [UserController],
  imports: [GraphcoolModule]
})
export class UserModule {}
