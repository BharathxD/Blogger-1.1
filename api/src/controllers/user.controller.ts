import { Request, Response } from "express";
import { loginUserInput, registerUserInput } from "../schema/user.schema";
import { registerUser, validatePassword } from "../services/user.service";
import { omit } from "lodash";
import logger from "../utils/logger";
import { signJWT, verifyJWT } from "../utils/jwt.utils";

export const registerUserHandler = async (
  req: Request<{}, {}, registerUserInput["body"]>,
  res: Response
) => {
  const { name, email, password } = req.body;
  try {
    logger.info("Creating the User...");
    const user = await registerUser({ name, email, password });
    const session = signJWT(user);
    logger.info("The user has been created ✅");
    res.status(200).cookie("token", session).send(omit(user, "password"));
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, loginUserInput["body"]>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const user = await validatePassword({ email, password });
    if (!user) {
      throw new Error("Invalid username or password");
    }
    const session = signJWT(user);
    res.status(200).cookie("token", session).send(user);
  } catch (error: any) {
    res.status(409).send({ message: error });
  }
};

export const profileHandler = (req: Request, res: Response) => {
  const { token } = req.cookies;
  try {
    if (token) {
      const isValid = verifyJWT(token);
      if (!isValid) {
        res.status(409).send({ message: "User is unauthorized" });
      }
      res.status(200).send(isValid.decoded);
    }
  } catch (error: any) {
    logger.error(error.message);
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  res.status(200).cookie("token", "").json({ message: "Session Ended" });
};
