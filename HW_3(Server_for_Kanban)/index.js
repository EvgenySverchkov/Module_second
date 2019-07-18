const express = require("express");
const fs = require("fs");
const cors = require('cors');
const bodyParser = require("body-parser");


const app = express();
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

const COLUMNS = './data/columns.json';
const CARDS = './data/cards.json';

app.get('/', function(req, res){
	res.send("Hello express server");
});

app.get('/api/column', function(req, res){
	let col = require(COLUMNS);
	console.log("get columns");	
	res.type("application/json").send(JSON.stringify(col));
});

app.get("/api/card", function(req, res){
	let card = require(CARDS);
	console.log("get cards");
	res.type("application/json").send(JSON.stringify(card));
});

app.post("/api/card", function(req,res){
	let arrCards = require(CARDS);
	let card = req.body;
	card.id = Math.max(0, ...(arrCards || []).map(item => item.id || 0)) + 1;
	arrCards.push(card);

	fs.writeFileSync(CARDS, JSON.stringify(arrCards, null, 2), {encoding: "utf8"});
	res.type("application/json").send(JSON.stringify(card, null, 2));
});

app.delete("/api/card/:id", function(req, res){
	const { id } = req.params;

	console.log("delete card", id);

	const cards = require(CARDS);
	const index = cards.findIndex(card => card.id == id);

	if(index === -1) {
		res.status(404);
		res.send();
	} else {
		cards.splice(index, 1);
        fs.writeFileSync(CARDS, JSON.stringify(cards, null, 2), {encoding: "utf8"});
		res.send();
	}
});

app.put("/api/card/:id", function(req, res) {
  const { id } = req.params;
  const card = req.body;

  console.log("put card", id, card);

  const cards = require(CARDS);
  const index = cards.findIndex(card => card.id == id);

  if (index === -1) {
    res.status(404);
    res.send();
  } else {
    cards[index] = card;
    fs.writeFileSync(CARDS, JSON.stringify(cards, null, 2), {encoding: "utf8"});
    res.type("application/json").send(JSON.stringify(card, null, 2));
  }
});

app.patch("/api/card/:id", function(req, res) {
  const { id } = req.params;
  const patch = req.body;

  console.log("patch card", id, patch);

  const cards = require(CARDS);
  const index = cards.findIndex(card => card.id == id);

  if (index === -1) {
    res.status(404);
    res.send();
  } else {
    const card = { ...cards[index], ...patch };
    cards[index] = card;
    fs.writeFileSync(CARDS, JSON.stringify(cards, null, 2), {encoding: "utf8"});

    res.type("application/json").send(JSON.stringify(card, null, 2));
  }
});

app.listen(3000, function(){
	console.log("Sever work");
});

