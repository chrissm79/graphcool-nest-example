import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { Resolver, Query, Mutation } from "@nestjs/graphql";
import { Context, getUserId } from "../../utils";

interface SignupMutationArgs {
  email: string;
  password: string;
  name: string;
}

@Resolver("User")
export class UserResolver {
  @Query()
  public async me(_, args: any, context: Context, info: any): Promise<any> {
    const id = getUserId(context);
    return context.db.query.user({ where: { id }  }, info);
  }

  @Mutation()
  public async signup(_, args: SignupMutationArgs, context: Context, info: any): Promise<any> {
    const password = await bcrypt.hash(args.password, 10);
    console.log({ password });
    const user = await context.db.mutation.createUser({
      data: { ...args, password }
    });
    console.log({ user });

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    };
  }
}
