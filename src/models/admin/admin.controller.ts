import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { $ref, CreateAdminInput, LoginInput } from "./admin.schema";
import { verifyPassword } from "../../utils/hash";
import { createAdmin, findAdminByEmail, findAdmins } from "./admin.service";


async function adminRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createAdminSchema"),
        response: {
          201: $ref("createAdminResponseSchema"),
        },
      },
    },
    registerAdminHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );

  server.get(
    "/",
    {
      preHandler: [server.authenticate],
    },
    getAdminHandler
  );
}

export default adminRoutes;



export async function registerAdminHandler(
	request: FastifyRequest<{
	  Body: CreateAdminInput;
	}>,
	reply: FastifyReply
  ) {
	const body = request.body;
  
	try {
	  const admin = await createAdmin(body);
  
	  return reply.code(201).send(admin);
	} catch (e) {
	  console.log(e);
	  return reply.code(500).send(e);
	}
  }
  
  export async function loginHandler(
	request: FastifyRequest<{
	  Body: LoginInput;
	}>,
	reply: FastifyReply
  ) {
	const body = request.body;
  
	// find a admin by email
	const admin = await findAdminByEmail(body.email);
  
	if (!admin) {
	  return reply.code(401).send({
		message: "Invalid email or password",
	  });
	}
  
	// verify password
	const correctPassword = verifyPassword({
	  candidatePassword: body.password,
	  salt: admin.salt,
	  hash: admin.password,
	});
  
	if (correctPassword) {
	  const { password, salt, ...rest } = admin;
	  // generate access token
	  return { accessToken: request.jwt.sign(rest) };
	}
  
	return reply.code(401).send({
	  message: "Invalid email or password",
	});
  }
  
  export async function getAdminHandler() {
	const admins = await findAdmins();
  
	return admins;
  }