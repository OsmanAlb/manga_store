import prisma from "../../utils/prisma";
import { CreateComicsInput } from "./comics.schema";


export async function createComicBook(
    data: CreateComicsInput & { ownerId: number }
) {
    return prisma.comic.create({
        data,
    })
}

export function getComics() {
    return prisma.comic.findMany({
        select: {
            description: true,
            title: true,
            pages: true,
            id: true,
            author: true,
            comic_book_cover: true,
            comic_book_pdf: true,
            createdAt: true,
            updatedAt: true,
            owner: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
}

export function getComicsImg(id: string) {
    console.log(id)
    return prisma.comic.findUnique({
        where: {
            id: parseInt(id, 10)
        },
        select: {
            comic_book_cover: true,
        }
    })
}

