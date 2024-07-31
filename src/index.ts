import express from "express";

import { tasksRouter } from "@/routes/tasks";
import { PORT } from "@/settings/env";

const app = express();

app.use(express.json());

app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
