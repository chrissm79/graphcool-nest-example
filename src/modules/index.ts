import { AuthModule } from "./auth/auth.module";
import { GraphcoolModule } from "./graphcool/graphcool.module";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";

export const Modules = [AuthModule, GraphcoolModule, PostModule, UserModule];
