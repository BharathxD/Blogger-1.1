import { Request, Response } from "express";
import { registerUserInput } from "../schema/user.schema";
import { registerUser } from "../services/user.service";
import { omit } from "lodash";
import logger from "../utils/logger";

export const registerUserHandler = async (
  req: Request<{}, {}, registerUserInput["body"]>,
  res: Response
) => {
  const { name, email, password } = req.body;
  try {
    logger.info("Creating the User...")
    const user = await registerUser({ name, email, password });
    logger.info("The user has been created ✅")
    res.status(200).send(omit(user, "password"));
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
};
