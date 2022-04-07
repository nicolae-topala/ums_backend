import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      // Show only the message data of the issues[]
      // e returns array of issues with data type which I don't want to share :)
      return res.status(400).send(e.issues[0].message);
    }
  };

export default validate;
