import { Prisma, PrismaClient } from "@prisma/client";
import { ListFetchRequest } from "../../../@types/common";
import { getOrderByClause, getWhereClause } from "./utils";

const prisma = new PrismaClient();

export const getUsers = async (request: ListFetchRequest) => {
  const { size, cursorValue, sort, filters } = request;
  const orderBy = getOrderByClause(sort) as Prisma.UserOrderByWithRelationInput;
  const where = getWhereClause(filters) as Prisma.UserWhereInput;

  let cursor;
  if (
    cursorValue &&
    sort?.field &&
    (sort.field === "id" || sort.field === "name")
  ) {
    cursor = {
      [sort.field]: cursor,
    } as unknown as Prisma.UserWhereUniqueInput;
  }
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
      take: size ? parseInt(size as unknown as string) : undefined,
      cursor,
      orderBy,
      where,
    });
    return users;
  } catch (err) {
    throw err;
  }
};
