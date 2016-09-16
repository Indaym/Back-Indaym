var express = require('express');

var app = express();

app.get('/', (req, res) => {
    console.log("get on /");
    res.send("hello world!");
});

app.listen(3000, () => {
    console.log("listen on port 3000");
});
