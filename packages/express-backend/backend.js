import express from "express";

const app = express();
const port = 8000;
const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};
const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};
const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const deleteUser = (userId) => {
    const userIndex = users["users_list"].findIndex(user => user.id === userId);
  
    if (userIndex !== -1) {
      const deletedUser = users["users_list"].splice(userIndex, 1)[0];
      console.log(`User with ID ${userId} has been deleted.`);
      return deletedUser;
    } else {
      console.log(`User with ID ${userId} not found.`);
      return null;
    }
  };

app.use(express.json());

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

app.get("/users/:name", (req, res) => {
    const name = req.params["name"]; //or req.params.name
    let result = findUserByName(name);
    if (result === [undefined]) {
        res.status(404).send("Resource not found. L");
    } else {
        res.send(result);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    deleteUser(userId);
    res.status(204).send();
  });