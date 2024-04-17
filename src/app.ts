import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import userRoutes from './modules/user/user.controller';
import { userSchemas } from './modules/user/user.schema';
import fjwt, { JWT } from '@fastify/jwt';
import { comicsSchemas } from './modules/comics/comics.schema';
import comicsRoutes from './modules/comics/comics.controller';
import * as dotenv from 'dotenv';
import { authorSchemas } from './modules/authors/author.schema';
import authorRoutes from './modules/authors/author.controller';
dotenv.config()
// console.log(dotenv.config().parsed)

export const server = Fastify();

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: {
            id: number
            email: string
            name: string
        }
    }
}

server.register(fjwt, {
    secret: process.env.SECRET
}); // здесь какая то ошибка, мол данные могут undefined, но я точно знаю что там не будет undefined 
// console.log(process.env.SECRET)

server.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (error) {
            return reply.send(error);
        }
    }
);
server.get('/', async function (request, response) {
    return { status: 'OK' };
});

async function main() {
    for (const schema of [ ...userSchemas, ...comicsSchemas, ...authorSchemas ]) {
        server.addSchema(schema);
    }

    server.register(userRoutes, { prefix: 'api/users' });
    server.register(comicsRoutes, {prefix: 'api/comics'})
    server.register(authorRoutes, {prefix: 'api/author'});

    try {
        await server.listen(3000, '0.0.0.0');
        console.log('Server is running at http://localhost:3000');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();

server.register(require('fastify-mongodb'), {
    url: 'mongodb+srv://OsmanAlb:azazazA9@cluster0.b3kf6kr.mongodb.net/'
})

