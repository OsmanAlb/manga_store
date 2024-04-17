import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const comicsInput = {
    title: z.string(),
    pages: z.number(),
    description: z.string()
    // возможно ещё какие-то поля, но я хз
}

const comicsGenerated = {
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string()
}

const createComicsSchema = z.object({
    ...comicsInput
})

const comicResponseSchema = z.object({
    ...comicsInput,
    ...comicsGenerated
})

const comicsResponseSchema = z.array(comicResponseSchema)

export type CreateComicsInput = z.infer<typeof createComicsSchema>

export const { schemas: comicsSchemas, $ref } = buildJsonSchemas({
    createComicsSchema,
    comicResponseSchema,
    comicsResponseSchema,
}, {
    $id: 'secondShema'
})