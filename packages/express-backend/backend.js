import express from "express";
import cors from "cors";
import userService from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    
    userService.getUsers(name, job)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.status(500).send("Internal Server Error");
        });
});


app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id

    userService.findUserById(id)
      .then((result) => {
          if (!result) {
              res.status(404).send("Resource not found.");
          } else {
              res.status(200).send(result);
          }
      })
      .catch((error) => {
          res.status(500).send("Internal Server Error");
      });
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];

    userService.deleteUser(id)
    .then(() => {
        res.status(204).send();
    })
    .catch((error) => {
        res.status(500).send("Internal Server Error");
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

    userService.addUser(userToAdd)
      .then((newUser) => {
          const responseUser = { ...userToAdd, _id: newUser._id };
          res.status(201).send(responseUser);
      })
      .catch((error) => {
          res.status(500).send("Internal Server Error");
      });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});