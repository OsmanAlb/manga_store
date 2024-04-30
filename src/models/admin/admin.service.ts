import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateAdminInput } from "./admin.schema";

export async function createAdmin(input: CreateAdminInput) {
  const { password, ...rest } = input;

  const { hash, salt } = hashPassword(password);

  const admin = await prisma.admin.create({
    data: { ...rest, salt, password: hash },
  });

  return admin;
}

export async function findAdminByEmail(email: string) {
  return prisma.admin.findUnique({
    where: {
      email,
    },
  });
}

export async function findAdmins() {
  return prisma.admin.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
}