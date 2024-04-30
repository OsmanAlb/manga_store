import prisma from "../../utils/prisma";
import { CreateAuthorInput } from "./author.schema";

export async function createAuthor( 
	data: CreateAuthorInput & { ownerId: number} ) 
	{ 
		return prisma.author.create({
		data
	})
}

export function getAuthors() {
	return prisma.author.findMany( {
		select: {
			id: true,
			name: true,
			owner: {
				select: {
					id: true,
                    name: true,
				}
			}
		}
	})
}