const express = require("express");
const router = express.Router();


//ludaan mockup tietokanta
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

//haetaan kaikki todot
router.get("/todos", (request, response) => {
    response.status(200).send(todos);
});

//haetaan todo id:n perusteella
//haetaan id pyynnön parametreista ja muutetaan se numeroksi
//verrataan haettua id:tä tietokannan id:siin
//jos id on tietokannassa palautetaan todo
router.get("/todos/:id", (request, response) => {

    const id = Number(request.params.id);
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        response.send(todo);
    } else {
        response.status(404).send("Muistiinpanoa ei löytynyt");
    }
});

//generoidaan id uusille todoille
//tarkistetaan mikä on tietokannan suurin id
//palautetaan suurin id ja lisätään siihen yksi
const generateId = () => {

    const maxId = todos.length > 0 ?
        Math.max(...todos.map(n => n.id)) :
        0
    return maxId + 1
}

//lähetetään uusi todo post metodilla
//jos request bodysta puuttuu title tai due annetaan error
//asetetaan id:si generoitu id ja parametreiksi pyynnön parametrit
//lisätään todo todos listaan ja näytetään lisätty todo
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

//lisätään uusi todo tai muokataan olemassa olevaa put metodilla
//tarkastetaan löytyykö id jo
//jos id:tä ei löydy lisätään uusi todo
//jos id löytyy muokataan todo
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

//poistetaan todo id:n perusteella
router.delete('/todos/:id', (request, response) => {
    const id = Number(request.params.id)
    todos = todos.filter(todo => todo.id !== id)

    response.status(204).end();
});

module.exports = router;