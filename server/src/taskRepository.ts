import { PrismaClient, Prisma } from "@prisma/client";
import {
  NewTask,
  SortType,
  Task,
  TasksListRequest,
} from "../../typings/taskTypes";

const prisma = new PrismaClient();

export const getTasks = async (request: TasksListRequest) => {
  const { sort, filters } = request;
  let orderBy: Prisma.TaskOrderByWithRelationInput = {};
  let where: { [filter: string]: unknown } = {};

  if (sort) {
    const field = sort.orderBy;
    orderBy[field] = sort.type;
  }
  if (filters) {
    for (let filter in filters) {
      const values = filters[filter];
      if (Array.isArray(values)) {
        where[filter] = { in: values };
      }
    }
  }
  try {
    const tasks = await prisma.task.findMany({
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
    taskOwner,
    priority,
    tags,
  } = task;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        dueDate,
        status,
        creationTime,
        taskOwner,
        priority,
        tags,
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
    taskOwner,
    priority,
    tags,
  } = task;

  try {
    const newTask = await prisma.task.update({
      data: {
        title,
        description,
        dueDate,
        status,
        creationTime,
        taskOwner,
        priority,
        tags,
      },
      where: {
        id: parseInt(id as unknown as string), // a fallback for conversion errors
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
