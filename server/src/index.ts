import * as path from "path";

import * as express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

const PORT = 5000;

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(express.json());

    const userRepository = connection.getRepository(User);

    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "build", "index.html"));
    });

    app.get("/api/users", async function (req, res) {
      const users = await userRepository.find();
      res.json(users);
    });

    app.get("/api/users/:id", async function (req, res) {
      const results = await userRepository.findOne(req.params.id);
      return res.send(results);
    });

    app.post("/api/users", async function (req, res) {
      const user = await userRepository.create(req.body);
      const results = await userRepository.save(user);
      return res.send(results);
    });

    app.put("/api/users/:id", async function (req, res) {
      const user = await userRepository.findOne(req.params.id);
      userRepository.merge(user, req.body);
      const results = await userRepository.save(user);
      return res.send(results);
    });

    app.delete("/api/users/:id", async function (req, res) {
      const results = await userRepository.delete(req.params.id);
      return res.send(results);
    });

    console.log("Established connection to DB.");
    console.log(`Starting server, listening on port ${PORT}.`);
    app.listen(process.env.PORT || PORT);
  })
  .catch((error) => console.log(error));
