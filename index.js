var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var PORT = 3300;

app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log('Global middleware here.');
  next();
});

/** index */
app.get('/', (req, res) => {
  res.json({ hello: "world" });
});

const noteRouter = require('./server/routes/notes');
app.use('/notes', function (req, res, next) {
  console.log('Notes middleware.');
  next();
} ,noteRouter);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});