import { Express, Request, Response } from "express";

const route = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    console.log("Runnning")
    res.sendStatus(200); // Ok
  });
};

export default route;
