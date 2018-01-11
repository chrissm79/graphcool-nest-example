import {
  Module,
  Inject,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod
} from "@nestjs/common";
import { graphqlExpress } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { GraphQLModule, GraphQLFactory } from "@nestjs/graphql";
import { Graphcool } from "../../generated/graphcool";
import { graphcoolProviders } from "./graphcool.providers";

@Module({
  components: [...graphcoolProviders],
  exports: [...graphcoolProviders],
  imports: [GraphQLModule]
})
export class GraphcoolModule implements NestModule {
  constructor(
    @Inject("Graphcool") private readonly db: Graphcool,
    private readonly graphQLFactory: GraphQLFactory
  ) {}

  configure(consumer: MiddlewaresConsumer) {
    const typeDefs = importSchema("./src/schema.graphql");
    const schema = this.graphQLFactory.createSchema({ typeDefs });
    const useEngine = !!process.env.ENGINE_API_KEY;

    consumer
      .apply(
        graphqlExpress(req => ({
          schema,
          tracing: useEngine,
          cacheControl: useEngine,
          rootValue: req,
          context: {
            request: req,
            db: this.db
          }
        }))
      )
      .forRoutes({ path: "/graphql", method: RequestMethod.ALL });
  }
}
