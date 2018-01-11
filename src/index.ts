// import { GraphQLServer } from 'graphql-yoga'
// import { Graphcool } from './generated/graphcool'
// import resolvers from './resolvers'
//
// const server = new GraphQLServer({
//   typeDefs: './src/schema.graphql',
//   resolvers,
//   context: req => ({
//     ...req,
//     db: new Graphcool({
//       endpoint: process.env.GRAPHCOOL_ENDPOINT,
//       secret: process.env.GRAPHCOOL_SECRET,
//     }),
//   }),
// })
//
// server.start(({ port }) => console.log(`Server is running on http://localhost:${port}`))

import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(3000);
}

bootstrap().catch(error => console.error(error));