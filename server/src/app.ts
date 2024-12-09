import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import tasks from "./taskController";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Error-handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message);
  res.status(500).send("Internal Server Error");
});

app.use("/tasks", tasks);

app.listen(port, () => console.log("Server ready"));
