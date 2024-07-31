# todo-api

A simple express API for managing tasks

## Dependencies

- `node` - `20.14.0` or later

## Setup Guide

1. Do a `git clone` of the project
2. Open a terminal/command prompt that targets the same folder as the `package.json` file
3. Run `npm install`
4. Run `npm run prepare`
5. Run `npm run dev`
6. Voila! You have your todo API ready.

## Endpoint description

### `GET` /api/tasks

Description: Retrieves a list of all tasks.

Responses:

#### 200 OK

Example Body:

```json
[
  {
    "id": 1,
    "description": "Task 1",
    "isCompleted": false
  },
  {
    "id": 2,
    "description": "Task 2",
    "isCompleted": true
  }
]
```

### `POST` /api/tasks

Description: Creates a new task.

Example Request Body:

```json
{
  "description": "New task"
}
```

Responses:

#### 201 Created

Example Response:

```json
{
  "id": 3,
  "description": "New task",
  "isCompleted": false
}
```

#### 400 Bad Request

Example Response:

```json
{
  "errors": ["Field 'description' is required."]
}
```

### `PATCH` /api/tasks/:taskId/isCompleted

Description: Updates the completion status of a specific task.

URL Parameters:

- `taskId` (integer): The ID of the task to update.

Example Request Body:

```json
{
  "isCompleted": false
}
```

Responses:

#### 201 Created

Example Response:

```json
{
  "id": 3,
  "description": "New task",
  "isCompleted": false
}
```

#### 400 Bad Request

Example Response:

```json
{
  "errors": ["Invalid 'taskId'"]
}
```

#### 404 Not Found

Returns if the task with the specified `taskId` does not exist.

### `DELETE` /api/tasks/completed

Description: Deletes all completed tasks.

Responses:

#### 204 No Content

### `DELETE` /api/tasks/:taskId

Description: Deletes a specific task by its ID.

URL Parameters:

- `taskId` (integer): The ID of the task to delete.

Responses:

#### 204 No Content

#### 400 Bad Request

Example Response:

```json
{
  "errors": ["Invalid 'taskId'"]
}
```

#### 404 Not Found
