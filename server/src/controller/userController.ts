import express, { Request, Response } from "express";
import {
  getUsers
} from "../repository/userRepository";
import { ListFetchRequest } from "../../../@types/common";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  getUsers(req.query as ListFetchRequest)
    .then((tasks) => res.status(200).json(tasks))
    .catch((err) => res.status(400).send(err.message));
});

export default router;
