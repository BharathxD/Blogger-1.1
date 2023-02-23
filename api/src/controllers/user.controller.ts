import { Request, Response } from "express";
import { registerUserInput } from "../schema/user.schema";
import { registerUser } from "../services/user.service";
import { omit } from "lodash";

export const registerUserHandler = async (
  req: Request<{}, {}, registerUserInput["body"]>,
  res: Response
) => {
  const { name, email, password } = req.body;
  try {
    const user = await registerUser({ name, email, password });
    res.status(200).send(omit(user, "password"));
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
};
