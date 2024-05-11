import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt, { JWT } from "@fastify/jwt";
import adminRoutes from "./models/admin/admin.controller";
import { adminSchemas } from "./models/admin/admin.schema";
import { comicsSchemas } from "./models/comics/comics.schema";
import comicsRoutes from "./models/comics/comics.controller";
import userRoutes from "./models/user/user.controller";
import { userSchemas } from "./models/user/user.schema";
import * as dotenv from 'dotenv'
import authorRoutes from "./models/authors/author.controller";
import { authorSchemas } from "./models/authors/author.schema";
import multipart from "@fastify/multipart"

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    admin: {
      id: number;
      email: string;
      name: string;
    };
  }
}

function buildServer() {
  const server = Fastify();

  if(process.env.SECRET) {
    server.register(fjwt, {
        secret: process.env.SECRET
    });
  } else { console.log( "Secret is not defined" ) }
  dotenv.config()

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );

  server.get("/", async function () {
    return { status: "OK" };
  });

  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });

  for (const schema of [...adminSchemas, ...comicsSchemas, ...userSchemas, ...authorSchemas]) {
    server.addSchema(schema);
  }

  server.register(adminRoutes, { prefix: "api/admin" });
  server.register(userRoutes, { prefix: "api/users" });
  server.register(comicsRoutes, { prefix: "api/comics" });
  server.register(authorRoutes, { prefix: "api/author" });

  server.register(multipart)

  return server;
}

export default buildServer;