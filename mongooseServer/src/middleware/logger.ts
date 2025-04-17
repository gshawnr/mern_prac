import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params, body, query } = req;
    // console.log(req);

    if (params) {
      console.log("url params: ", params);
    }

    if (query) {
      console.log("query: ", query);
    }

    if (body) {
      console.log("body: ", body);
    }

    next();
  } catch (e) {
    console.log(`logger error: ${(e as Error).message}`);
  }
};

export default logger;
