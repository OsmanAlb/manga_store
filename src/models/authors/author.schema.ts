import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const authorInput = {
	name: z.string(),// возможно я ещё какие-то поля добавлю
	id: z.number()
}

const createAuthorSchema = z.object({ 
	...authorInput
 });

const authorGenerated = {
	createdAt: z.string(),
    updatedAt: z.string()
}

const authorResponseSchema = z.object({
	...authorGenerated,
    ...authorInput
})

const authorsResponseSchema = z.array(authorResponseSchema)

export type CreateAuthorInput = z.infer<typeof createAuthorSchema>

export const { schemas: authorSchemas, $ref } = buildJsonSchemas({
	createAuthorSchema,
	authorResponseSchema,
    authorsResponseSchema,
}, {
	$id: 'thirdSchema'
})