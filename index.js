const express = require('express');
const app = express();

let port = process.env.port || 3300;
app.get('/', (req, res) => {
    let name = 'Welcome to sample node app!';
    let id = (Math.random() * 1000000000).toFixed(0);
    let dateOn = (new Date()).toString();
    let usr = { id, name, dateOn };
    res.json(usr);
});

app.listen(port, () => {
    console.log("app is running on port ", port);
})