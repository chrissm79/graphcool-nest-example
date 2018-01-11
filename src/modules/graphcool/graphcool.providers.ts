import { Graphcool } from "../../generated/graphcool";

export const graphcoolProviders = [{
  provide: "Graphcool",
  useFactory: () => {
    return new Graphcool({
      endpoint: process.env.GRAPHCOOL_ENDPOINT,
      secret: process.env.GRAPHCOOL_SECRET,
    });
  }
}];
