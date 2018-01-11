import { Resolver, Query } from "@nestjs/graphql";
import { Context } from "../../utils";

@Resolver("Post")
export class PostResolver {
  @Query()
  public async feed(parent: any, args: any, ctx: Context, info: any): Promise<any> {
    return ctx.db.query.posts({ where: { isPublished: true } }, info);
  }
}
