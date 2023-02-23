import { Request, Response } from "express";
import { registerUserInput } from "../schema/user.schema";

export const registerUserHandler = (
  req: Request<{}, {}, registerUserInput["body"]>,
  res: Response
) => {
  const { name, email, password } = req.body;
  return res.status(200).send({ message: name });
};
