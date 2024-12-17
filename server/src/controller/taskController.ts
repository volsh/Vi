import express, { Request, Response } from "express";
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTasks,
} from "../repository/taskRepository";
import { body, validationResult } from "express-validator";
import { ListFetchRequest } from "../../../@types/common";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  getTasks(req.query as ListFetchRequest)
    .then((tasks) => res.status(200).json(tasks))
    .catch((err) => res.status(400).send(err.message));
});

router.get("/:id", (req: Request, res: Response) => {
  getTask(parseInt(req.params.id))
    .then((tasks) => res.status(200).json(tasks))
    .catch((err) => res.status(400).send(err.message));
});

router.post("/", [], (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
  createTask(req.body)
    .then((task) => res.status(200).json(task))
    .catch((err) => res.status(400).send(err.message));
});

router.put("/:id", [], (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
  updateTask(req.body)
    .then((task) => res.status(200).json(task))
    .catch((err) => res.status(400).send(err.message));
});

router.delete("/", (req: Request, res: Response) => {
  const idsStr = req.query.ids as string;
  const ids: number[] = idsStr.split(",").map(Number);
  deleteTasks(ids)
    .then((tasks) => res.status(200).json(tasks))
    .catch((err) => res.status(400).send(err.message));
});

export default router;
