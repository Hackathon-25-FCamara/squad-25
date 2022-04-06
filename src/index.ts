import express, { Request, Response, Express } from "express"
import connection from "./connection"

const app = express()

app.post("/users", async (req: Request, res: Response) => {
  try {
     await connection.raw(`
        INSERT INTO Users
           (id, name, salary, birth_date, gender)
        VALUES (
           ${Date.now().toString()},
           "${req.body.name}",
           ${req.body.salary},
           "${req.body.birthDate}",
           "${req.body.gender}"
); `)
     res.status(201).send("Success!")
  } catch (error: any) {
     console.log(error.message);
     res.status(500).send("An unexpected error occurred")
  }})