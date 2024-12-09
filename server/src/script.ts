import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import tasks from "../_mockDB/tasks.json";

async function main() {
  // This is the migration script I used to pre-populate the DB from the mocked json. No need to run it again unless the DB file gets deleted
  const promises: Array<Promise<unknown>> = [];

  tasks.forEach((task) => {
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
    promises.push(
      prisma.task.create({
        data: {
          title,
          description,
          dueDate,
          status,
          creationTime,
          taskOwner,
          priority,
          tags: tags?.join(","),
        },
      })
    );
  });
  Promise.allSettled(promises).then((results) => {
    console.log("All promises settled:", results);
  });
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
