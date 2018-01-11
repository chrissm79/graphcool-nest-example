import { Engine } from "apollo-engine";
import { Graphcool } from "../../generated/graphcool";

export const graphcoolProviders = [
  {
    provide: "Graphcool",
    useFactory: () => {
      return new Graphcool({
        endpoint: process.env.GRAPHCOOL_ENDPOINT,
        secret: process.env.GRAPHCOOL_SECRET
      });
    }
  },
  {
    provide: "ApolloEngine",
    useFactory: async () => {
      const apiKey = process.env.ENGINE_API_KEY || null;

      if (apiKey) {
        const engine = new Engine({
          engineConfig: {
            apiKey
          },
          dumpTraffic: true
        });

        await engine.start();
        return engine;
      } else {
        return {};
      }
    }
  }
];
