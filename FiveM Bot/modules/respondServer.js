

global.server = http.createServer((req, res) => {
    if (req.method === 'POST') {
		let body = '';
			req.on('data', chunk => {
				body += chunk.toString();
			});
			req.on('end', () => {
				var array = JSON.parse("[" + body + "]");
				let list = client.guilds.cache.get(config.discordGuild).members; 
				
				var command = array[0].command
				
				if (command != null){
				switch (command.toString()) {
					case 'setName':
					/*if(array[0].name.length > 5 && array[0].discordId.toString().length > 5){
						member = list.get(array[0].discordId.toString());
						member.setNickname(array[0].name).catch(function(e){});
					}
					*/
					case 'log':
						console.log(array[0].log)
					
					break;
				  default:
					break;
				}
					
				}
				
			});
		

    }
});
server.listen(71);

global.sendCommand = function(command){
	let url = 'http://'+config.serverIp+"/zielu_handler/command";
	fetch(url, {
		method : "POST",
		body : JSON.stringify({
		login : '',
		password : '',
		args : command
		})
	});
}
console.log('\x1b[36mBOT\x1b[0m @ \x1b[32mLoaded respondServer \x1b[0m');