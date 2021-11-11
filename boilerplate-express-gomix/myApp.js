var express = require('express');
var app = express();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });



console.log("Hello World");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/json", (req, res) => {
  const mySecret = process.env["MESSAGE_STYLE"];
  if (mySecret === "uppercase") {
    res.json({
      message: "HELLO JSON",
    });
  } else {
    res.json({
      message: "Hello json",
    });
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time,
    });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.get("/name", (req, res) => {
  var firstName = req.query.first;
  var lastName = req.query.last;

  res.json({
    name: `${firstName} ${lastName}`,
  });
});

app.post("/name", (req, res) => {
  let fullName = req.body.first + " " + req.body.last;
  res.json({ name: fullName });
});































 module.exports = app;
