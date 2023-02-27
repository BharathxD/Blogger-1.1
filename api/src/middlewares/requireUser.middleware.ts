import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwt.utils";
import logger from "../utils/logger";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    const user = verifyJWT(token);
    if (!user) {
      res.status(403).send({ message: "The user is not authenticated" });
    }
    next();
  } catch (error: any) {
    logger.error(error);
  }
};

export default requireUser;
