import { Express, Request, Response } from "express";

const route = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200); // Ok
  });
  app.post("/api/register", (req: Request, res: Response) => {
    res.status(200).send({message: "Success"}); // Ok
  });
};

export default route;
