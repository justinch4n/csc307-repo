import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
        const id = characters[index]._id;
        fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE"
        })
        .then((response) => {
            if (response.status === 204) {
                const updated = characters.filter((character, i) =>
                    i !== index);
                setCharacters(updated);
            } else if (response.status === 404) {
                console.log("User not found");
            } else {
                console.log("Unexpected response status:", response.status)
            }
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
        });
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }
   
    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    function updateList(person) {
        postUser(person)
            .then(response => response.json())
            .then(newUser => {
            setCharacters(prevCharacters => [...prevCharacters, newUser]);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json))
            .catch((error) => { console.log(error); });
    }, [] );

    return (
        <div className="container">
            <Table
                characterData={characters} 
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );

}

export default MyApp;