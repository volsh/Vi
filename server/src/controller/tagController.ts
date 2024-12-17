import express, { Request, Response } from "express";
import { ListFetchRequest } from "../../../@types/common";
import { getTags } from "../repository/tagRepository";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  getTags(req.query as ListFetchRequest)
    .then((tags) => res.status(200).json(tags))
    .catch((err) => res.status(400).send(err.message));
});

export default router;
