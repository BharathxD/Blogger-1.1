import { Express, Request, Response } from "express";
import validate from "./middlewares/validateSchema.middlware";
import { loginUserSchema, registerUserSchema } from "./schema/user.schema";
import {
  loginUserHandler,
  profileHandler,
  registerUserHandler,
} from "./controllers/user.controller";

const route = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200); // Ok
  });
  app.post("/api/register", validate(registerUserSchema), registerUserHandler);
  app.post("/api/login", validate(loginUserSchema), loginUserHandler);
  app.get("/api/profile", profileHandler)
};

export default route;
