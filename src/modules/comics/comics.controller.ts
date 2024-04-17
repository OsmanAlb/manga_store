// здесь короче будет реализован crud с помощью которого можно будет создать, редактировать, обновлять и удалять комикс

import { FastifyInstance, FastifyRequest } from "fastify";
import { CreateComicsInput, $ref } from './comics.schema'
import { createComicBook, getComics } from "./comics.service";
// route 

async function comicsRoutes(server: FastifyInstance) {
    server.post(
        '/', {
        preHandler: [server.authenticate],
        schema: {
            body: $ref("createComicsSchema"),
            response: {
                201: $ref("comicResponseSchema")
            }
        }
    },
        createComicsHandler
    )
    server.get('/', {
        schema: {
            response: {
                200: $ref("comicsResponseSchema")
            }
        }
    },
        getComicsHandler)
}

export default comicsRoutes

// создание комикса 

export async function createComicsHandler(
    request: FastifyRequest<{
        Body: CreateComicsInput
    }>
) {
    const comicBook = await createComicBook({
        ...request.body,
        // authorId: request.user.id
    })
    console.log('New book was created', comicBook)
    return comicBook
}

// доступ к комиксу по id ( get method )

export async function getComicsHandler() {
    const comics = await getComics()
    return comics
}