const app = require('express')();
const orm = new require('waterline')();
const bodyParser = require('body-parser');
const methodOverRide = require('method-override');
const config = require('./config/config');
 */
 * Import section
/**
const routes = require('./src/routes/routes');

const DBconfig = require('./config/waterlineConfig').DBconfig;
const forum = require('./src/forum/forum');

// orm.loadCollection(Message);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverRide());

app.use('/forum', forum);

app.use('/forum', routes.forum);
/**
 * Log all the call on the API
 *
 * @param req
 * @param res
 * @param next
 */
const logCall = (req, res, next) => {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
};

app.get('/', (req, res) => {
    console.log("get on /");
    res.send("go to see things on /messages");
});
// app.use(logCall);
app.use(logCall);
app.use('/forum', routes.forumRouter);


orm.initialize(DBconfig, (err, models) => {
  if (err) throw err;

  app.models = models.collections;
  app.connections = models.connections;

  app.listen(3000, () => {
    console.log("listen on port 3000");
  });
});