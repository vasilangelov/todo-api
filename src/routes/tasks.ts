import { PrismaClient } from "@prisma/client";
import express from "express";

import { HTTPStatus } from "@/constants/http";
import { validateBody } from "@/utils/validation";
import {
  createTaskBodySchema,
  updateTaskCompletionSchema,
} from "@/validation/tasks";

const prisma = new PrismaClient();

export const tasksRouter = express.Router();

tasksRouter.get("/", async (req, res) => {
  const tasks = await prisma.task.findMany();

  res.json(tasks);
});

tasksRouter.post("/", async (req, res) => {
  const validationResult = validateBody(req, createTaskBodySchema);

  if (!validationResult.isValid) {
    return res
      .status(HTTPStatus.BadRequest)
      .json({ errors: validationResult.errors ?? [] });
  }

  const task = await prisma.task.create({
    data: {
      description: validationResult.value.description,
      isCompleted: false,
    },
  });

  res.status(HTTPStatus.Created).json(task);
});

tasksRouter.patch("/:taskId/isCompleted", async (req, res) => {
  const taskId = parseInt(req.params.taskId);

  if (Number.isNaN(taskId)) {
    return res.status(HTTPStatus.BadRequest).json({
      errors: ["Invalid 'taskId'"],
    });
  }

  const taskExists =
    (await prisma.task.count({
      where: {
        id: taskId,
      },
    })) > 0;

  if (!taskExists) {
    return res.sendStatus(HTTPStatus.NotFound);
  }

  const validationResult = validateBody(req, updateTaskCompletionSchema);

  if (!validationResult.isValid) {
    return res
      .status(HTTPStatus.BadRequest)
      .json({ errors: validationResult.errors ?? [] });
  }

  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: { isCompleted: validationResult.value.isCompleted },
  });

  res.status(HTTPStatus.Ok).json(task);
});

tasksRouter.delete("/completed", async (req, res) => {
  await prisma.task.deleteMany({
    where: {
      isCompleted: true,
    },
  });

  res.sendStatus(HTTPStatus.NoContent);
});

tasksRouter.delete("/:taskId", async (req, res) => {
  const taskId = parseInt(req.params.taskId);

  if (Number.isNaN(taskId)) {
    return res.status(HTTPStatus.BadRequest).json({
      errors: ["Invalid 'taskId'"],
    });
  }

  const taskExists =
    (await prisma.task.count({
      where: {
        id: taskId,
      },
    })) > 0;

  if (!taskExists) {
    return res.sendStatus(HTTPStatus.NotFound);
  }

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  res.sendStatus(HTTPStatus.NoContent);
});
