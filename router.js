const express = require("express");
const router = express.Router();

let todos = [{
        id: 1,
        title: "Koulu",
        description: "Tee läksyt",
        due: "Aina kun niitä tulee"
    },
    {
        id: 2,
        title: "Kauppa",
        description: "Osta maitoa",
        due: "Kun kerkiät"
    },
    {
        id: 3,
        title: "Työt",
        description: "Mene töihin",
        due: "Arki aamuisin"
    }
]

router.get("/todos", (request, response) => {
    response.status(200).send(todos);
});

router.get("/todos/:id", (request, response) => {

    const id = Number(request.params.id);
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        response.send(todo);
    } else {
        response.status(404).send("Muistiinpanoa ei löytynyt");
    }
});


const generateId = () => {

    const maxId = todos.length > 0 ?
        Math.max(...todos.map(n => n.id)) :
        0
    return maxId + 1
}

router.post('/todos', (request, response) => {

    const body = request.body;

    if (!body.title || !body.due) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const todo = {
        id: generateId(),
        title: body.title,
        description: body.description,
        due: body.due,
    }

    todos = todos.concat(todo);

    response.json(todo);
});

router.put("/todos/:id", (request, response) => {

    const body = request.body;
    const id = Number(request.params.id);
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        const todo = {
            id: generateId(),
            title: body.title,
            description: body.description,
            due: body.due,

        }

        todos = todos.concat(todo);

        response.json(todo);
    } else {
        todo = {
            id: id,
            title: body.title,
            description: body.description,
            due: body.due,
        }

        todos = todos.splice(todo);

        response.json(todo);
    }
});

router.delete('/todos/:id', (request, response) => {
    const id = Number(request.params.id)
    todos = todos.filter(todo => todo.id !== id)

    response.status(204).end();
});

module.exports = router;