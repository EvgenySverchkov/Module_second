const fs = require('fs');
const express = require('express');
const multer = require('multer');
const libZip = require('zlib');

const gzip = libZip.createGzip();
const unzip = libZip.createUnzip();
var app = express();
var upload = multer();
app.use(express.static(__dirname));

app.post('/store', upload.single('postdata'), function(req,res){
	if(req.file.size >= 10000000){
		console.error(new Error("File is big"));
		res.status(404);
		res.end("File is big");
	}
	else{
		console.log(req.file.originalname);
		fs.createReadStream(req.file.originalname)
			.pipe(libZip.createGzip())
			.pipe(fs.createWriteStream('storage\\' + req.file.originalname + '.zz'));
		res.end(fs.readFileSync(req.file.originalname));
	}
});

app.get('/app', function(req, res){
	let arr = req.query.getdata.split('.');
	arr.splice(arr.length-1, 1);
	let filename = arr.join('.');
	
	fs.createReadStream('storage\\' + req.query.getdata)
		.pipe(libZip.createGunzip())
		.pipe(fs.createWriteStream('new\\' + filename));
	res.end("File download");
});

app.listen(3000);