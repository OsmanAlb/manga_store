import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';
import fjwt from '@fastify/jwt';

export const server = Fastify();

server.register(fjwt, {
    secret: 'secret_access_token_secret',
});

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
    for (const schema of userSchemas) {
        server.addSchema(schema);
    }

    server.register(userRoutes, { prefix: 'api/users' });

    try {
        await server.listen(3000, '0.0.0.0');
        console.log('Server is running at http://localhost:3000');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
