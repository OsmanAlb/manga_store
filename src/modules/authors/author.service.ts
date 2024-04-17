import prisma from "../../utils/prisma";
import { CreateAuthorInput } from "./author.schema";

export async function createAuthor( data: CreateAuthorInput ) {
	return prisma.author.create( {
		data
	} )
}

export function getAuthors() {
	return prisma.author.findMany( {
		select: {
			id: true,
			name: true,
			birthplace: true,
			twitter: true,
		}
	})
}