import * as express from "express";
import { NestFactory } from "@nestjs/core";
import { Engine } from "apollo-engine";
import { ApplicationModule } from "./app.module";

async function bootstrap() {
  const server = express();

  if (!!process.env.ENGINE_API_KEY) {
    const engine = new Engine({
      engineConfig: {
        apiKey: process.env.ENGINE_API_KEY
      },
      graphqlPort: 3000,
      dumpTraffic: true
    });
    await engine.start();
    server.use(engine.expressMiddleware());
  }

  const app = await NestFactory.create(ApplicationModule, server);
  await app.listen(3000);
}

bootstrap().catch(error => console.error(error));
