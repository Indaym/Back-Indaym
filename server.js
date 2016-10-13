const app = require('express')();
const orm = new require('waterline')();
const bodyParser = require('body-parser');
const methodOverRide = require('method-override');

const DBconfig = require('./config/waterlineConfig').DBconfig;
const forum = require('./src/forum/forum');

// orm.loadCollection(Message);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverRide());

app.use('/forum', forum);

app.get('/', (req, res) => {
    console.log("get on /");
    res.send("go to see things on /messages");
});


orm.initialize(DBconfig, (err, models) => {
  if (err) throw err;

  app.models = models.collections;
  app.connections = models.connections;

  app.listen(3000, () => {
    console.log("listen on port 3000");
  });
});