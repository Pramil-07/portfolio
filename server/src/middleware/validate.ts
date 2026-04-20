import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

type RequestWithValidatedBody<TBody> = Request & { validatedBody?: TBody };

export function validateBody<TBody>(schema: ZodType<TBody>) {
    return (req: RequestWithValidatedBody<TBody>, res: Response, next: NextFunction): void => {
        try {
            req.validatedBody = schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    error: "Invalid request payload",
                    details: error.issues.map((issue) => ({
                        path: issue.path.join("."),
                        message: issue.message,
                    })),
                });
                return;
            }
            next(error);
        }
    };
}

export type { RequestWithValidatedBody };
