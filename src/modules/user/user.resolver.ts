import { Resolver, Query } from '@nestjs/graphql';
import { Context, getUserId } from '../../utils';

@Resolver('User')
export class UserResolver {
  @Query()
  public async me(_, args: any, context: Context, info: any): Promise<any> {
    const id = getUserId(context.request);
    return context.db.query.user({ where: { id } }, info);
  }
}
