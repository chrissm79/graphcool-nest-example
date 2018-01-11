import { Controller, Get, Inject, Res } from "@nestjs/common";
import { Graphcool } from "../../generated/graphcool";

@Controller("/graphcool")
export class GraphcoolController {
  constructor(@Inject("Graphcool") private readonly db: Graphcool) {}

  @Get("/posts")
  public async posts(@Res() res: any): Promise<void> {
    const posts = await this.db.query.posts({ first: 10 });
    res.json({ posts });
  }
}
