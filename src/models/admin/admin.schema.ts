import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const adminCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  name: z.string(),
};

const createAdminSchema = z.object({
  ...adminCore,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

const createAdminResponseSchema = z.object({
  id: z.number(),
  ...adminCore,
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type CreateAdminInput = z.infer<typeof createAdminSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: adminSchemas, $ref } = buildJsonSchemas({
  createAdminSchema,
  createAdminResponseSchema,
  loginSchema,
  loginResponseSchema,
});