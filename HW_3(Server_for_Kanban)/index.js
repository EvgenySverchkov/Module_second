const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

var routes = require('./routes.js')();
app.use('/', routes);

app.listen(3000, function(){
	console.log("Sever work");
});

