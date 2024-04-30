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
