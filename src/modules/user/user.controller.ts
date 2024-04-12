import { FastifyRequest, FastifyReply } from "fastify";
import { createUserInput, LoginInput } from "./user.schema";
import { createUser, findUserByEmail, findUsers } from "./user.service"
import { verifyPassword } from "../../utils/hash";
import { server } from "../../app";
import { FastifyInstance } from 'fastify';
import { $ref } from './user.schema';


// router
async function userRoutes(server: FastifyInstance) {
  server.post(
      '/',
      {
          schema: {
              body: $ref('createUserSchema'),
              response: {
                  201: $ref('createUserResponseSchema'),
              },
          },
      },
      registerUserHandler
  );

  server.post(
      '/login',
      {
          schema: {
              body: $ref('loginSchema'),
              response: {
                  200: $ref('loginResponseSchema'),
              },
          },
      },
      loginHandler
  ),

  server.get('/', {
      preHandler: [server.authenticate]
  }, getUsersHandler);
}

export default userRoutes;

// controller routes

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: createUserInput;
  }>,
  reply: FastifyReply
) {
    const body = request.body;

    try {
        const user = await createUser(body)

        return reply.code(201).send(user)
    } catch (error) {
        console.log(error)
        return reply.code(500).send(error)
    }
}

export async function loginHandler(request: FastifyRequest<{
  Body: LoginInput;
}>, reply: FastifyReply
) {
  const body = request.body;

  // find a user by email
  const user = await findUserByEmail(body.email)

  if(!user) {
    return reply.code(404).send({ message: "User not found" })
  }

  // verify password
  const  correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  })

  if(correctPassword) {
    const {password, salt, ...rest} = user
    // generate access token

    return { accessToken: server.jwt.sign(rest) } 
  }
  return reply.code(401).send({ message: "Invalid email or password" })

  // respond
}

export async function getUsersHandler() {
  const users = await findUsers()
  return users
}

