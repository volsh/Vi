-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "creationTime" TEXT NOT NULL,
    "taskOwner" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "tags" TEXT
);
