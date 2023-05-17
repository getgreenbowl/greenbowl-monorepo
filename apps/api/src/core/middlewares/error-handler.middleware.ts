import { NextFunction, Request, Response } from "express";
import { serverError } from "proses-response";
import ErrorLogger from "../logger/error-logger";

// eslint-disable-next-line max-params
const errorHandler = (err: any, _: Request, res: Response, _next: NextFunction) => {
    ErrorLogger.write(err);
    // eslint-disable-next-line no-console
    console.log(err);
    serverError(res, err);
}

export default errorHandler