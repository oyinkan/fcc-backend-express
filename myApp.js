let express = require('express');
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/public", express.static(__dirname + "/public"));

app.use(function middleware(req, res, next) {
  // Do something
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  // Call the next function in line:
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})

app.get("/json", (req, res, next) => {
  process.env['MESSAGE_STYLE'] === "uppercase"
    ? res.status(200).json({ "message": "Hello json".toUpperCase() })
    : res.json({ "message": "Hello json" })
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({time: req.time});
})

app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word})
})

app.get('/name', (req, res) => {
  let { first: firstname, last: lastname } = req.query;
  res.json({ name: `${firstname} ${lastname}` })
})

app.post('/name', (req, res) => {
  let string = `${req.body.first} ${req.body.last}`;
  res.json({ name: string });
})






























module.exports = app;
