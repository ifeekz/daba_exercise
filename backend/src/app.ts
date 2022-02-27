import 'reflect-metadata';
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
  // ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { connect, set } from 'mongoose';
import { buildSchema } from 'type-graphql';
// import { createConnection } from 'typeorm';
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@databases';
import { authMiddleware, authChecker } from '@middlewares/auth.middleware';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, responseLogger, errorLogger } from '@utils/logger';
import mongoose from 'mongoose';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(resolvers) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initApolloServer(resolvers);
    this.initializeErrorHandling();
  }

  public async listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`🎮 http://localhost:${this.port}/graphql`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  /*private connectToDatabase() {
    createConnection(dbConnection);
  }*/

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(dbConnection.url, dbConnection.options, function (error) {
      if (error) {
        logger.info(`DB connection err: ${error}`);
      }
    });
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet({ contentSecurityPolicy: NODE_ENV === 'production' ? undefined : false }));
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private async initApolloServer(resolvers) {
    const schema = await buildSchema({
      resolvers: resolvers,
      authChecker: authChecker,
    });

    const apolloServer = new ApolloServer({
      schema: schema,
      // playground: NODE_ENV === 'development' ? true : false,
      // introspection: NODE_ENV === 'development' ? true : false,
      // tracing: true,
      plugins: [
        // ApolloServerPluginLandingPageGraphQLPlayground(),
        NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
          : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      ],
      context: async ({ req }) => {
        try {
          const user = await authMiddleware(req);
          return { user };
        } catch (error) {
          throw new Error(error);
        }
      },
      formatResponse: (response, request) => {
        responseLogger(request);

        return response;
      },
      formatError: error => {
        errorLogger(error);

        return error;
      },
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({
      app: this.app,
      cors: ORIGIN,
      path: '/graphql',
      onHealthCheck: () =>
        new Promise((resolve, reject) => {
          if (mongoose.connection.readyState > 0) {
            resolve();
          } else {
            reject();
          }
        }),
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
