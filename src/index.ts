import { Request, Response } from "express"
import app from "./app"
import connection from "./connection"

app.get("/users", async (req, res) => {
  try {
    const result = await connection.raw('SELECT * FROM Users;')
    res.send(result[0])
  } catch (error: any) {
    res.send(error.message)
  }
})

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
           "${req.body.role}"
); `)
    res.status(201).send("Success!")
  } catch (error: any) {
    res.status(500).send("An unexpected error occurred")
  }
})