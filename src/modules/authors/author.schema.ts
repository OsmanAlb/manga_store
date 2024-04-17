import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const authorInput = {
	id: z.number(),
	name: z.string(),
	birthplace: z.string(),
	twitter: z.string(),
}

const createAuthorSchema = z.object({ ...authorInput });

export type CreateAuthorInput = z.infer<typeof createAuthorSchema>

export const { schemas: authorSchemas } = buildJsonSchemas({
	createAuthorSchema
}, {
	$id: 'thirdShema'
})