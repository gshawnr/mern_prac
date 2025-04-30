import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body, query } = req;
    console.log("logger middleware: logging ...");

    next();
  } catch (e) {
    console.log(`logger error: ${(e as Error).message}`);
  }
};

export default logger;
