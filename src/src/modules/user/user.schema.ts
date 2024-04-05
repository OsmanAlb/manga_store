import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
    email: z
        .string({
            required_error: 'Email is required',
            invalid_type_error: 'Email is not valid',
        })
        .email(),
    name: z.string(),
};
const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password is not valid',
    }),
});

const createUserResponseSchema = z.object({
    ...userCore,
});

const loginSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required',
            invalid_type_error: 'Email is not valid',
        })
        .email(),
    password: z.string(),
});

const loginResponseSchema = z.object({
    accessToken: z.string(),
});

export type createUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
});
