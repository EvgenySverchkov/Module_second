var express = require('express');
const fs = require("fs");

const COLUMNS = './data/columns.json';
const col = require(COLUMNS);
const CARDS = './data/cards.json';
const cardData = require(CARDS);

var router = express.Router();

module.exports = function(){
	router.get('/', function(req, res){
		res.send("Hello express server");
	});

	router.get('/api/column', function(req, res){
		console.log("get columns");	
		res.type("application/json").send(JSON.stringify(col));
	});

	router.get("/api/card", function(req, res){
		console.log("get cards");
		res.type("application/json").send(JSON.stringify(cardData));
	});

	router.post("/api/card", function(req,res){
		let arrCards = cardData;
		let card = req.body;
		card.id = Math.max(0, ...(arrCards || []).map(item => item.id || 0)) + 1;
		arrCards.push(card);

		fs.writeFileSync(CARDS, JSON.stringify(arrCards, null, 2), {encoding: "utf8"});
		res.type("application/json").send(JSON.stringify(card, null, 2));
	});

	router.delete("/api/card/:id", function(req, res){
		const { id } = req.params;

		console.log("delete card", id);

		const cards = cardData;
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

	router.put("/api/card/:id", function(req, res) {
		const { id } = req.params;
		const card = req.body;

		console.log("put card", id, card);

		const cards = cardData;
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

	router.patch("/api/card/:id", function(req, res) {
		const { id } = req.params;
		const patch = req.body;

		console.log("patch card", id, patch);

		const cards = cardData;
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
	return router;
}