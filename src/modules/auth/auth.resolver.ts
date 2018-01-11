import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Resolver, ResolveProperty, Mutation } from '@nestjs/graphql';
import { User } from '../../generated/graphcool';
import { Context } from '../../utils';

interface IAuthPayload {
  token: string;
  user: User;
}

interface ILoginArgs {
  email: string;
  password: string;
}

interface SignupMutationArgs {
  email: string;
  password: string;
  name: string;
}

@Resolver('AuthPayload')
export class AuthResolver {
  @Mutation()
  public async login(
    _,
    { email, password }: ILoginArgs,
    ctx: Context,
    info: any
  ): Promise<IAuthPayload> {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    };
  }

  @Mutation()
  public async signup(
    _,
    args: SignupMutationArgs,
    context: Context,
    info: any
  ): Promise<{ token: string; user: User }> {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.db.mutation.createUser({
      data: { ...args, password }
    });

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    };
  }

  @ResolveProperty()
  public async user(
    { user: { id } },
    args: any,
    ctx: Context,
    info: any
  ): Promise<User> {
    console.log('AuthPayload.user');
    return ctx.db.query.user({ where: { id } }, info);
  }
}
