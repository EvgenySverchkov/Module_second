let readLine = require('readline');
let fs = require('fs');
let path = require('path');

let rl = readLine.createInterface({
	input: process.stdin,
	output:process.stdout
});

rl.on('line', (data)=>{
	let src = data.split(" ");
	let filePath = src.splice(0,1)[0];
	let text = src.join(' ');

	let dirName = path.dirname(filePath);

	let fileName = path.basename(filePath);
	
	if(dirName=='.'){
		fs.writeFileSync(fileName, text);
	}
	else{
		fs.mkdirSync(dirName, {recursive: true});
		fs.writeFileSync(filePath, text+'\n', {flag: 'a'});
	}
	
});

rl.on('close',()=>console.log('\nGoodbaye. Have a nice day!!!'));