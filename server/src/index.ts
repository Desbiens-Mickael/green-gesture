import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import datasource from "./db";
import jwt from "jsonwebtoken";
import express from "express";
import { env } from "./env";
import User from "./entity/User";
import cookie from "cookie";
import { UserResolver } from "./resolvers/UserResolver";
import { CommentResolver } from "./resolvers/CommentResolver";
import { CompanyResolver } from "./resolvers/CompanyResolver";
import { EcoActionResolver } from "./resolvers/EcoActionResolver";
import { GroupResolver } from "./resolvers/GroupResolver";
import { TeamResolver } from "./resolvers/TeamResolver";
import { UserEcoActionResolver } from "./resolvers/UserEcoActionResolver";
import { ValidationResolver } from "./resolvers/ValidationResolver";
import { NotificationResolver } from "./resolvers/NotificationResolver";
import { LikeEcoActionResolver } from "./resolvers/LikeEcoActionResolver";

export interface JWTPayload {
  userId: number;
}

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
}

async function start(): Promise<void> {
  await datasource.initialize();

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      CommentResolver,
      CompanyResolver,
      EcoActionResolver,
      GroupResolver,
      TeamResolver,
      UserEcoActionResolver,
      ValidationResolver,
      NotificationResolver,
      LikeEcoActionResolver,
    ],
    validate: {
      forbidUnknownValues: false,
    },
    authChecker: async (
      { context }: { context: ContextType },
      roles: string | string[]
    ) => {
      const userSubscriptionType = context.currentUser?.subscriptionType;
      const userRole = context.currentUser?.role;

      // if @Authorized() without roles
      if (roles.length === 0) {
        return userSubscriptionType !== undefined || userRole !== undefined;
      }

      // if @Authorized(['roles']) with roles

      if (userSubscriptionType === undefined || userRole === undefined) {
        return false;
      }

      if (Object.values(roles).includes(userSubscriptionType)) {
        return true;
      }

      if (Object.values(roles).includes(userRole)) {
        return true;
      }

      return false;
    },
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    context: async ({ req, res }) => {
      const { headers } = req;

      const tokenInAuthHeaders = headers.authorization?.split(" ")[1];
      const tokenInCookie = cookie.parse(headers.cookie ?? "").token;

      const token = tokenInAuthHeaders ?? tokenInCookie;

      if (typeof token === "string") {
        const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY) as JWTPayload;
        if (typeof decoded === "object") {
          const currentUser = await datasource.getRepository(User).findOne({
            where: { id: decoded.userId },
            relations: {
              groups: true,
              createdGroups: true,
              createdEcoActions: true,
              relatedEcoActions: true,
              teams: true,
              friends: true,
              company: { users: true },
              createdCompany: true,
            },
          });
          if (currentUser !== null) {
            return { req, res, currentUser };
          } else {
            throw new Error("User not found");
          }
        }
      } else {
        return { req, res };
      }
    },
    cors: {
      origin: env.CORS_ALLOWED_ORIGINS.split(","),
      credentials: true,
    },
  });

  await server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

start().catch(console.error);
