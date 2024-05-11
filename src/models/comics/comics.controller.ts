// здесь короче будет реализован crud с помощью которого можно будет создать, редактировать, обновлять и удалять комикс

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { CreateComicsInput, $ref } from './comics.schema'
import { createComicBook, getComics, getComicsImg } from "./comics.service";
// import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'

const pump = util.promisify(pipeline)
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
    server.get<{ Params: { id: string } }>('/:id', {}, getComicsImgHandler)
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
        ownerId: request.admin.id,
    }) 

    // const parts = request.files()
    //  for await (const part of parts) {
    //     await pump(part.file, fs.createWriteStream(`./upload/${part.filename}`))
    // }

    return comics // && { message: 'file uploaded successfully'}
}

async function getComicsHandler() {
    const comics = await getComics()
    return comics
}

async function getComicsImgHandler(
    request: FastifyRequest<{
        Params: {
            id: string
        }
    }>,
    reply: FastifyReply
) {
    const { id } = request.params
    const comicsImg = await getComicsImg(id)
    return comicsImg
}
