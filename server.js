const app = require('express')();
const orm = new require('waterline')();

const bodyParser = require('body-parser');
const methodOverRide = require('method-override');
const DBconfig = require('./config/waterlineConfig').DBconfig;

const routes = require('./src/routes/routes');
const collections = require('./src/models');
/**
 * middleware import
 */
const logCall = require('./src/middleware/logCall').logCall;

orm.loadCollection(require('./src/models/Topics').TopicsCollection);
orm.loadCollection(require('./src/models/Messages').MessagesCollection);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverRide());
app.use(logCall);

app.get('/', (req, res) => {
  res.send("hello world!");
});

app.use('/forum', routes.forumRouter);

orm.initialize(DBconfig, (err, models) => {
  if (err) throw err;

  app.models = models.collections;
  app.connections = models.connections;

  app.listen(3000, () => {
    console.log("listen on port 3000");
  });
});
