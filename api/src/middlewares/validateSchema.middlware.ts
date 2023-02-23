import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirmation } = req.body;
    try {
      schema.parse({
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
      });
      next();
    } catch (error: any) {
      res.status(404).send({ message: error.message });
    }
  };

export default validate;
