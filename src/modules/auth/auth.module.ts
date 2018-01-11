import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";

@Module({
  components: [AuthResolver]
})
export class AuthModule {}
