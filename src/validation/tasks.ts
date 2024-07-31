import { boolean, maxLength, minLength, object, pipe, string } from "valibot";

export const createTaskBodySchema = object({
  description: pipe(
    string("Field 'description' is required."),
    minLength(1, "Field 'description' must be at least 1 character long."),
    maxLength(30, "Field 'description' must be maximum 30 characters long.")
  ),
});

export const updateTaskCompletionSchema = object({
  isCompleted: boolean(),
});
