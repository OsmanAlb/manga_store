// здесь короче будет реализован crud с помощью которого можно будет создать, редактировать, обновлять и удалять комикс

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

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
        createComicsHandler )
    server.get('/', {
        schema: {
            response: {
                200: $ref("comicsResponseSchema")
            }
        }
    },
        getComicsHandler )
}

export default comicsRoutes

// создание комикса 

//  А что я хочу чтобы мой код выполнял??
// Я хочу прописать связь "один ко многим" то есть от одного автора выдаётся массив его книг

async function createComicsHandler(
    request: FastifyRequest<{
        Body: CreateComicsInput
    }>,
    reply: FastifyReply
) {
    const comics = await createComicBook({
        ...request.body,
        ownerId: request.user.id,
    }) 
    return comics
}

async function getComicsHandler() {
    const comics = await getComics()
    return comics
}