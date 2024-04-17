// здесь нужно создать функции которые будут создавать авторов книг
// то есть например мы имеем книгу: Берсерк у неё автор: Кентаро Накамура. И нам нужно прописать, стоп, а зачем?
// зачем мне авторы, когда я могу отдельно к каждой книге прописать то какой у неё автор
// хотя, нет мне нужна таблица авторов, чтобы если пользователь захотел посмотреть на других авторов
// он мог отправить get запрос на получение всех книг авторов.
import { FastifyInstance, FastifyRequest } from "fastify";
import { CreateAuthorInput } from "./author.schema";
import { createAuthor, getAuthors } from "./author.service";

// route
async function authorRoutes( server: FastifyInstance) {
	server.post('/', createAuthorHandler)
	server.get('/', getAuthorHandler)
}
export default authorRoutes;
// controller


export async function createAuthorHandler(
	request: FastifyRequest <{
		Body: CreateAuthorInput
	}>
) {

	const author = await createAuthor({
		...request.body,
	})

	return author
}

export async function getAuthorHandler() {
	const authors = await getAuthors()

	return authors
}