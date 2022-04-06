import { Request, Response } from "express"
import app from "./app"
import connection from "./connection"

app.get("/users", async (req, res) => {
  try {
    const result = await connection.raw('SELECT * FROM Users;')
    res.send(result.length === 1 ? result[0][0] : result[0])
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

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const data = await connection.raw(`
       SELECT name, email, password, photo, bio, links, role FROM Users
       WHERE id = ${req.params.id}; `);
    //res.status(201).json(data);
    console.log(data[0]);
    res.status(200).send("Success!");
  } catch (error: any) {
    console.log(error);
    res.status(500).send("An unexpected error occurred");
  }
})

app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    await connection.raw(`
       UPDATE Users
        SET 
           name = "${req.body.name}",
           email = "${req.body.email}",
           password = "${req.body.password}",
           photo = "${req.body.photo}",
           bio = "${req.body.bio}",
           links = "${req.body.links}",
           role = "${req.body.role}",
        
       WHERE id = ${req.params.id}; `);
    res.status(200).send("Success!");
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send("An unexpected error occurred");
  }
})

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    await connection.raw(`
       DELETE FROM Users  
           WHERE id = ${req.params.id}; `);
    res.status(200).send("Success!");
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send("An unexpected error occurred");
  }
})