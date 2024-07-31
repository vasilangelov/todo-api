import { Request } from "express";
import {
  BaseIssue,
  BaseSchema,
  InferOutput,
  isValiError,
  parse,
} from "valibot";

export function validateBody<
  Schema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>
>(
  req: Request,
  schema: Schema
):
  | {
      isValid: true;
      value: InferOutput<NoInfer<Schema>>;
    }
  | {
      isValid: false;
      errors?: string[];
    } {
  try {
    return {
      isValid: true,
      value: parse(schema, req.body),
    };
  } catch (error) {
    if (isValiError(error)) {
      return {
        isValid: false,
        errors: error.issues.map((issue) => issue.message),
      };
    }

    return {
      isValid: false,
    };
  }
}
