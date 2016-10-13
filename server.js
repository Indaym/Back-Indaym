const express = require('express');
const app = express();

const forum = require('./src/forum/forum');

app.use('/forum', forum);

app.get('/', (req, res) => {
    console.log("get on /");
    res.send("hello world!");
});

app.listen(3000, () => {
    console.log("listen on port 3000");
});
