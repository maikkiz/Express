//tuodaan express
//luodaan portti
//tuodaan cors
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

//haetaan router
const router = require("./router");

//määritetään base urli
const baseUrl = '/api/v1';

//otetaan käyttään json parseri ja cors
app.use(express.json());
app.use(cors());

app.use((request, response, next) => {
    console.log(`Received: ${request.method} ${request.path}`);
    next();
});

//yhdistetään base urli ja routerista tulevat polut
app.use(baseUrl, router);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening to port ${port}`);
});