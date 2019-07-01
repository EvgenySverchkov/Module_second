const http = require('http');
const url = require('url');
const fs = require('fs');


let server = new http.Server();


let someHnadler = (req,res)=>{
	/*if(req.url === '/favicon.ico')
	{
		console.log("lol")
		res.writeHead(200, {'Content-Type':'image/x-icon'});
		res.end();
		//return;
	}*/

	let indexSlesh = req.url.split('/');
	let arr = indexSlesh.join('\\');
	let parseUrl = url.parse(req.url).pathname;

	let file = fs.readFile(__dirname + parseUrl, 'utf8', (err, content)=>{
		if(err){
			res.statusCode = 404;
			res.end();
		}else{
			res.write(content);
			res.end();
		}
	});
}

server.on('request', someHnadler); 
server.listen(3000);