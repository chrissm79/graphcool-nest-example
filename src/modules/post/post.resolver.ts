import { Resolver, Query, Mutation } from "@nestjs/graphql";
import { Post } from "../../generated/graphcool";
import { Context, getUserId } from "../../utils";

interface IWritePostArgs {
  title: string;
  text: string;
}

@Resolver("Post")
export class PostResolver {
  @Query()
  public async feed(_: {}, args: {}, ctx: Context, info: any): Promise<any> {
    return ctx.db.query.posts({ where: { isPublished: true } }, info);
  }

  @Mutation()
  public async writePost(_: {}, { title, text }: IWritePostArgs, ctx: Context, info: any): Promise<Post> {
    const authorId = getUserId(ctx);
    return ctx.db.mutation.createPost({
      data: {
        isPublished: true,
        title,
        text,
        author: {
          connect: { id: authorId }
        }
      }
    }, info);
  }

  @Mutation()
  public async deletePost(_: {}, { id }: { id: string }, ctx: Context, info: any): Promise<Post> {
    const authorId = getUserId(ctx);
    const postExists = await ctx.db.exists.Post({ id, author: { id: authorId } });

    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }

    return ctx.db.mutation.deletePost({ where: { id } });
  }
}
