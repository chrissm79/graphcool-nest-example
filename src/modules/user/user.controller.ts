import { Controller, Get, Inject, Res } from '@nestjs/common';
import { Graphcool } from '../../generated/graphcool';

@Controller('/users')
export class UserController {
  constructor(@Inject('Graphcool') private readonly db: Graphcool) {}

  @Get('/')
  public async posts(@Res() res: any): Promise<void> {
    const users = await this.db.query.users({ first: 10 });
    res.json({ users });
  }
}
