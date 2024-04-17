import prisma from "../../utils/prisma";
import { CreateComicsInput } from "./comics.schema";


export async function createComicBook( data: CreateComicsInput ) {
    return prisma.comics.create({ data })
}
// примерно тут была ошибка, типа, если я пишу Comics вместо comics, то моя БД отвечает что поля не существует. 
//И я короче не знаю как это решить., если только не сносить всю бд в кхуям 
//   |
//  ||
//  \/
// а тут я не могу получить свой объект хотя в бд он у меня есть

export function getComics() {
    return prisma.comics.findMany({ 
        select: {
            description: true,
            title: true,
            pages: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            // author: {
            //     select: {
            //         name: true,
            //         id: true
            //     }
            // }
        }
    })
}


//  когда я отправляю get запрос мне приходит ошибка {
//     "statusCode": 500,
//     "error": "Internal Server Error",
//     "message": "\"title\" is required!"
// } хотя в базе данных есть объект с такими полями?  {
//     "id": 3,
//     "createdAt": "2024-04-13T23:19:34.442Z",
//     "updatedAt": "2024-04-13T23:19:34.442Z",
//     "title": "Vagabond",
//     "description": "Story about Miyamoto Musashi",
//     "pages": 328
// }