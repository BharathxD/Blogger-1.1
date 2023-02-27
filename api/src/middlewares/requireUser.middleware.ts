import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwt.utils";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  const user = verifyJWT(token);
  if (!user) {
    res.sendStatus(403);
  }
  next();
};

export default requireUser;
