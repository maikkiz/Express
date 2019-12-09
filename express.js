const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

const router = require("./router");

const baseUrl = '/api/v1';

app.use(express.json());
app.use(cors());

app.use((request, response, next) => {
    console.log(`Received: ${request.method} ${request.path}`);
    next();
});

app.use(baseUrl, router);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening to port ${port}`);
});