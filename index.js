const express = require('express');
var mongoose = require('mongoose');
const provider = require('./provider');
const app = express();

let port = process.env.port || 3300;

app.get('/', async (req, res) => {
    let result = await provider.get();
    res.json(result);
});

app.listen(port, () => {
    console.log("app is running on port ", port);
})