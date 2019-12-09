const express = require("express");
const router = express.Router();
const todos = require("./todos");

router.get("/todos", (request, response) => {
    response.status(200).send(todos);
});

router.get("/todos/:id", (request, response) => {

    const id = Number(request.params.id);
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        response.send(todo);
    }
    else { 
        response.status(404).send("Muistiinpanoa ei löytynyt");
    }
});

module.exports = router;