import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { getUserId } from "../../utils";

@Guard()
export class AuthGuard implements CanActivate {
  canActivate(req, context: ExecutionContext): boolean {
    try {
      const userId = getUserId(req);

      if (!userId) {
        this.throw();
      }

      return true;
    } catch(err) {
      this.throw();
    }
  }

  private throw(): void {
    throw new Error("not authorized");
  }
}
