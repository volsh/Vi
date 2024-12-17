import { Prisma, PrismaClient } from "@prisma/client";
import { ListFetchRequest } from "../../../@types/common";
import { getOrderByClause, getWhereClause } from "./utils";

const prisma = new PrismaClient();

export const getTags = async (request: ListFetchRequest) => {
  const { size, cursorValue, sort, filters } = request;
  const orderBy = getOrderByClause(sort) as Prisma.TagOrderByWithRelationInput;
  const where = getWhereClause(filters) as Prisma.TagWhereInput;

  let cursor;
  if (
    cursorValue &&
    sort?.field &&
    (sort.field === "id" || sort.field === "name")
  ) {
    cursor = {
      [sort.field]: cursor,
    } as unknown as Prisma.TagWhereUniqueInput;
  }
  try {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
      },
      take: size ? parseInt(size as unknown as string) : undefined,
      cursor,
      orderBy,
      where,
    });
    return tags;
  } catch (err) {
    throw err;
  }
};
