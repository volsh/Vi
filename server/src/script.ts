import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import tasks from "../_mockDB/tasks.json";

async function main() {
  // This is the migration script I used to pre-populate the DB from the mocked json. No need to run it again unless the DB file gets deleted
  const promises: Array<Promise<unknown>> = [];

  tasks.forEach(async (task) => {
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
    const user = await prisma.user.upsert({
      where: {
        name: taskOwner,
      },
      create: {
        name: taskOwner,
      },
      update: {
        name: taskOwner,
      },
    });
    const tagIds: number[] = [];
    tags.forEach(async (tagName) => {
      const tag = await prisma.tag.upsert({
        where: {
          name: tagName,
        },
        create: {
          name: tagName,
        },
        update: {
          name: tagName,
        },
      });
      tagIds.push(tag.id);
    });
    await prisma.task.create({
      data: {
        title,
        description,
        dueDate,
        status,
        creationTime,
        taskOwnerId: user.id,
        priority,
        tags: {
          connect: tagIds.map((tagId) => ({ id: tagId })),
        },
      },
    });
  });
  // Promise.allSettled(promises).then((results) => {
  //   console.log("All promises settled:", results);
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
