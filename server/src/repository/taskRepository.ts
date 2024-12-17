import { PrismaClient, Prisma } from "@prisma/client";
import { NewTask, Task } from "../../../@types/task";
import { ListFetchRequest } from "../../../@types/common";
import { getOrderByClause, getWhereClause } from "./utils";

const prisma = new PrismaClient();

export const getTasks = async (request: ListFetchRequest) => {
  const { size, offset, cursorValue, sort, filters } = request;
  const orderBy = getOrderByClause(sort) as Prisma.TaskOrderByWithRelationInput;
  const where = getWhereClause(filters) as Prisma.TaskWhereInput;

  let cursor, skip;
  if (cursorValue && sort?.field === "id") {
    cursor = {
      [sort.field]: cursor,
    };
  } else if (offset) {
    skip = offset;
  }
  try {
    const tasks = await prisma.task.findMany({
      take: size || undefined,
      cursor,
      skip,
      orderBy,
      where,
      select: {
        id: true,
        title: true,
        dueDate: true,
        status: true,
        priority: true,
      },
    });
    return tasks;
  } catch (err) {
    throw err;
  }
};

export const getTask = async (id: number) => {
  try {
    const task = await prisma.task.findFirst({
      include: {
        taskOwner: {
          select: {
            id: true,
            name: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        id: {
          equals: id,
        },
      },
    });
    return task;
  } catch (err) {
    throw err;
  }
};

export const createTask = async (task: NewTask) => {
  const {
    title,
    description,
    dueDate,
    status,
    creationTime,
    taskOwnerId,
    priority,
    tagIds,
  } = task;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        dueDate,
        status,
        creationTime,
        taskOwnerId,
        priority,
        tags: tagIds?.length
          ? { connect: tagIds.map((tagId) => ({ id: tagId })) }
          : undefined,
      },
    });
    return newTask;
  } catch (err) {
    throw err;
  }
};

export const updateTask = async (task: Task) => {
  const {
    id,
    title,
    description,
    dueDate,
    status,
    creationTime,
    taskOwnerId,
    priority,
    tagIds,
  } = task;

  try {
    const newTask = await prisma.task.update({
      data: {
        title,
        description,
        dueDate,
        status,
        creationTime,
        taskOwnerId,
        priority,
        tags: tagIds?.length
          ? { set: [], connect: tagIds.map((tagId) => ({ id: tagId })) }
          : undefined,
      },
      where: {
        id,
      },
    });
    return newTask;
  } catch (err) {
    throw err;
  }
};

export const deleteTasks = async (idsToDelete: number[]) => {
  try {
    const newTask = await prisma.task.deleteMany({
      where: {
        id: {
          in: idsToDelete,
        },
      },
    });
    return newTask;
  } catch (err) {
    throw err;
  }
};
