import express, { Request, Response, Express } from "express"
import cors from "cors"
import { AddressInfo } from "net"
import connection from "./connection"

export const app: Express = express()
app.use(express.json())
app.use(cors())

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo
    console.log(`Server is running in http://localhost:${address.port}`)
  } else {
    console.error(`Failure upon starting server.`)
  }
})

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
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})