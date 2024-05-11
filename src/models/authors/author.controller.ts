// здесь нужно создать функции которые будут создавать авторов книг
// то есть например мы имеем книгу: Берсерк у неё автор: Кентаро Накамура. И нам нужно прописать, стоп, а зачем?
// зачем мне авторы, когда я могу отдельно к каждой книге прописать то какой у неё автор
// хотя, нет мне нужна таблица авторов, чтобы если пользователь захотел посмотреть на других авторов
// он мог отправить get запрос на получение всех книг авторов.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateAuthorInput } from "./author.schema";
import { createAuthor, getAuthors } from "./author.service";
import { $ref } from "./author.schema";

// controller


export async function createAuthorHandler(
	request: FastifyRequest <{
		Body: CreateAuthorInput
	}>,
	reply: FastifyReply
) {
	try {
		const author = await createAuthor({
			...request.body,
			ownerId: request.admin.id,
		})
		reply.code(201).send(author)
	} catch (e) {
		reply.code(500).send({error: 'Error creating author'})
	}
}

export async function getAuthorHandler() {
	const authors = await getAuthors()

	return authors
}


// route
async function authorRoutes( server: FastifyInstance) {
	server.post('/',
	{
		preHandler: [server.authenticate],
		schema: {
			body: $ref('createAuthorSchema'),
			response: {
				201: $ref('authorResponseSchema')
			}
		}
	},
	createAuthorHandler)

	server.get('/',
	  	{
			schema: {
				response: {
                    200: $ref('authorsResponseSchema')
                }
			}
		},
	getAuthorHandler)
}
export default authorRoutes;