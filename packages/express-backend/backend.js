import express from "express";
import cors from "cors";

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

const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000).toString();
};

const addUser = (user) => {
    const newUser = { id: generateUniqueId(), ...user  };
    users["users_list"].push(newUser);
    return newUser;
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

const findUserByName_Job = (name, job) => {
    return users["users_list"].filter(
    (user) => (user["name"] === name &&
    user["job"] === job) 
)}; 

app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const newUser = addUser(userToAdd);
    res.status(201).send(newUser);
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

app.get("/users", (req, res) => { //Formated ?name=[name]&job=[job]
    const name = req.query.name;
    const job = req.query.job;
    if (name && job ) {
        let result = findUserByName_Job(name, job) ;
        result = {users_list: result };
        res.send (result);
    } else {
    res.send ("Failed");
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