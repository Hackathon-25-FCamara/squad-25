import express, { Request, Response, Express } from "express"
import connection from "./connection"

const app = express()

app.post("/users", async (req: Request, res: Response) => {
  try {
     await connection.raw(`
        INSERT INTO Users
           (name, email, password, photo, bio, links, role)
        VALUES (
           "${req.body.name}",
           "${req.body.email}",
           "${req.body.password}",
           "${req.body.photo}",
           "${req.body.bio}",
           "${req.body.links}",
           "${req.body.role}",
); `)
     res.status(201).send("Success!")
  } catch (error: any) {
     console.log(error.message);
     res.status(500).send("An unexpected error occurred")
  }})