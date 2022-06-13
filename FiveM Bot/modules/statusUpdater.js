var servicesString = '';
var playersCount = 'OFF';
var	policeCount = 0;
var	ambulanceCount = 0;
updateStatus = async() =>{
	await getJSON('http://'+config.serverIp+'/players.json')
		.then(async(response) => {
			if (response == null || response == []) { playersCount = 0; policeCount = 0; ambulanceCount = 0;
			} else {
				playersCount = response.length
				await getJSON('http://'+config.serverIp+'/zielu_handler/services') //my own way to get services list, comment it if you dont need
					.then(function(response) {
					var start2 = response;
					if (start2 == null || start2 == []) { policeCount = 0; ambulanceCount = 0;
					} else {
						policeCount = start2[1];ambulanceCount = start2[0];
					}
					}).catch(function(error) { policeCount = 0; ambulanceCount = 0; if( config.showError) {console.log(error)}; }); 
			}
		}).catch(function(error) {
			playersCount = 'OFF'
			policeCount = 0
			ambulanceCount = 0
		});
	servicesString = config.iconServer+': '+playersCount+', '+config.iconPolice+': '+policeCount+', '+config.iconAmbulance+': '+ambulanceCount
	if(config.enableCustomStatus){servicesString = config.customStatus}
	client.user.setActivity(servicesString, { type: 'WATCHING' });
};
sortByKey2 = function (array, key) {
	return array.sort(function(a, b) {
		var x = a[key]; var y = b[key];
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}
updatePlayerList = async() =>{ 
	const listChannel = client.channels.cache.get(config.playerListChannel);
	listChannel.messages.fetch()
	.then(function(list){
      listChannel.bulkDelete(list);
    }, function(err){listChannel.send("Blad podczas czyszczenia wiadomosci :(")})	
	.then(async function(list){
		await getJSON('http://'+config.serverIp+'/players.json')
		.then(async(response) => {
			var start = response
			let currentdate = new Date().toLocaleTimeString('en-US', { hour12: false,  hour: "numeric", minute: "numeric"});
			if (response == null || response == []) { 
				//brak graczy
			} else {
				start = sortByKey2(start, 'id');
				
				let msg1  = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('**Lista graczy **\n-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /1')}; 
				let msg2  = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /2')};
				let msg3  = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /3')};
				let msg4  = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /4')};
				let msg5  = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /5')};
				let msg6  = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /6')};
				let msg7  = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /7')};
				let msg8  = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /8')};
				let msg9  = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /9')};
				let msg10 = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /10')};
				let msg11 = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /11')};
				let msg12 = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /12')};
				let msg13 = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /13')};
				let msg14 = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /14')};
				let msg15 = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate+' /15')};
				let msg16 = {idString : '', nickString : '', pingString : '',
					embed : new Discord.MessageEmbed()
					.setDescription('-----------------------------------------------------------------------------------------------')
					.setColor(56108)
					.setFooter('BOT @ '+currentdate)};
				for(var i in start){
					var curId = null;
					for(var d in start[i].identifiers){
						if(start[i].identifiers[d].slice(0,8)=='discord:'){
							curId = start[i].identifiers[d].slice(8,start[i].identifiers[d].length)
						}
					}
					if(curId != null){
						start[i].name = '<@'+curId+'>'
					}else{
						if(start[i].name.length > 13){start[i].name = start[i].name.substring(0,10)+'...'} 
					}
					if(start[i].ping == -1){start[i].ping='Laczy sie';};
					
					
					if(i <=32 ){
						let id = String(start[i].id);
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg1.idString = msg1.idString+id+'\n'; 
						msg1.nickString = msg1.nickString+nick+'\n';
						msg1.pingString = msg1.pingString+ping+'\n';
					}else if(i >32 && i <=64){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg2.idString = msg2.idString+id+'\n'; 
						msg2.nickString = msg2.nickString+nick+'\n';
						msg2.pingString = msg2.pingString+ping+'\n';
					}else if(i >64 && i <=96){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg3.idString = msg3.idString+id+'\n'; 
						msg3.nickString = msg3.nickString+nick+'\n';
						msg3.pingString = msg3.pingString+ping+'\n';
					}else if(i >96&& i <=128){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg4.idString = msg4.idString+id+'\n'; 
						msg4.nickString = msg4.nickString+nick+'\n';
						msg4.pingString = msg4.pingString+ping+'\n';
					}else if(i > 128&& i <=160){	
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg5.idString = msg5.idString+id+'\n'; 
						msg5.nickString = msg5.nickString+nick+'\n';
						msg5.pingString = msg5.pingString+ping+'\n';
					}else if(i > 160&& i <=192){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg6.idString = msg6.idString+id+'\n'; 
						msg6.nickString = msg6.nickString+nick+'\n';
						msg6.pingString = msg6.pingString+ping+'\n';
					}else if(i > 192&& i <=224){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg7.idString = msg7.idString+id+'\n'; 
						msg7.nickString = msg7.nickString+nick+'\n';
						msg7.pingString = msg7.pingString+ping+'\n';
					}else if(i > 224&& i <=256){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg8.idString = msg8.idString+id+'\n'; 
						msg8.nickString = msg8.nickString+nick+'\n';
						msg8.pingString = msg8.pingString+ping+'\n';
					}else if(i > 256&& i <=288){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg9.idString = msg9.idString+id+'\n'; 
						msg9.nickString = msg9.nickString+nick+'\n';
						msg9.pingString = msg9.pingString+ping+'\n';
					}else if(i > 288&& i <=320){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg10.idString = msg10.idString+id+'\n'; 
						msg10.nickString = msg10.nickString+nick+'\n';
						msg10.pingString = msg10.pingString+ping+'\n';
					}else if(i > 320&& i <=352){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg11.idString = msg11.idString+id+'\n'; 
						msg11.nickString = msg11.nickString+nick+'\n';
						msg11.pingString = msg11.pingString+ping+'\n';
					}else if(i > 352&& i <=384){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg12.idString = msg12.idString+id+'\n'; 
						msg12.nickString = msg12.nickString+nick+'\n';
						msg12.pingString = msg12.pingString+ping+'\n';
					}else if(i > 384&& i <=416){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg13.idString = msg13.idString+id+'\n'; 
						msg13.nickString = msg13.nickString+nick+'\n';
						msg13.pingString = msg13.pingString+ping+'\n';
					}else if(i > 416&& i <=448){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg14.idString = msg14.idString+id+'\n'; 
						msg14.nickString = msg14.nickString+nick+'\n';
						msg14.pingString = msg14.pingString+ping+'\n';
					}else if(i > 448&& i <=480){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg15.idString = msg15.idString+id+'\n'; 
						msg15.nickString = msg15.nickString+nick+'\n';
						msg15.pingString = msg15.pingString+ping+'\n';
					}else if(i > 480&& i <=512){
						let id = start[i].id;
						let nick = start[i].name;
						let ping = start[i].ping;
						if(ping == -1){ping='Laczy sie';};
						msg16.idString = msg16.idString+id+'\n'; 
						msg16.nickString = msg16.nickString+nick+'\n';
						msg16.pingString = msg16.pingString+ping+'\n';
					}

				}
				if(msg1.idString != ''){
					let newmsg1embed = msg1.embed
					newmsg1embed
					.addField('ID', msg1.idString, true)
					.addField('NICK', msg1.nickString, true)
					.addField('PING', msg1.pingString, true)
					await listChannel.send({embed: msg1.embed})
				}else{
					let newmsg1embed = msg1.embed
					newmsg1embed
					.addField('ID', 'Brak', true)
					.addField('NICK', 'Brak', true)
					.addField('PING', 'Brak', true)
					await listChannel.send({embed: msg1.embed})
				}
				
				if(msg2.idString != ''){
					let newmsg1embed = msg2.embed
					newmsg1embed
					.addField('ID', msg2.idString, true)
					.addField('NICK', msg2.nickString, true)
					.addField('PING', msg2.pingString, true)
					await listChannel.send({embed: msg2.embed})
				}
				if(msg3.idString != ''){
					let newmsg1embed = msg3.embed
					newmsg1embed
					.addField('ID', msg3.idString, true)
					.addField('NICK', msg3.nickString, true)
					.addField('PING', msg3.pingString, true)
					await listChannel.send({embed: msg3.embed})
				}
				if(msg4.idString != ''){
					let newmsg1embed = msg4.embed
					newmsg1embed
					.addField('ID', msg4.idString, true)
					.addField('NICK', msg4.nickString, true)
					.addField('PING', msg4.pingString, true)
					await listChannel.send({embed: msg4.embed})
				}
				if(msg5.idString != ''){
					let newmsg1embed = msg5.embed
					newmsg1embed
					.addField('ID', msg5.idString, true)
					.addField('NICK', msg5.nickString, true)
					.addField('PING', msg5.pingString, true)
					await listChannel.send({embed: msg5.embed})
				}
				if(msg6.idString != ''){
					let newmsg1embed = msg6.embed
					newmsg1embed
					.addField('ID', msg6.idString, true)
					.addField('NICK', msg6.nickString, true)
					.addField('PING', msg6.pingString, true)
					await listChannel.send({embed: msg6.embed})
				}
				if(msg7.idString != ''){
					let newmsg1embed = msg7.embed
					newmsg1embed
					.addField('ID', msg7.idString, true)
					.addField('NICK', msg7.nickString, true)
					.addField('PING', msg7.pingString, true)
					await listChannel.send({embed: msg7.embed})
				}
				if(msg8.idString != ''){
					let newmsg1embed = msg8.embed
					newmsg1embed
					.addField('ID', msg8.idString, true)
					.addField('NICK', msg8.nickString, true)
					.addField('PING', msg8.pingString, true)
					await listChannel.send({embed: msg8.embed})
				}
				if(msg9.idString != ''){
					let newmsg1embed = msg9.embed
					newmsg1embed
					.addField('ID', msg9.idString, true)
					.addField('NICK', msg9.nickString, true)
					.addField('PING', msg9.pingString, true)
					await listChannel.send({embed: msg9.embed})
				}
				if(msg10.idString != ''){
					let newmsg1embed = msg10.embed
					newmsg1embed
					.addField('ID', msg10.idString, true)
					.addField('NICK', msg10.nickString, true)
					.addField('PING', msg10.pingString, true)
					await listChannel.send({embed: msg10.embed})
				}
				if(msg11.idString != ''){
					let newmsg1embed = msg11.embed
					newmsg1embed
					.addField('ID', msg11.idString, true)
					.addField('NICK', msg11.nickString, true)
					.addField('PING', msg11.pingString, true)
					await listChannel.send({embed: msg11.embed})
				}
				if(msg12.idString != ''){
					let newmsg1embed = msg12.embed
					newmsg1embed
					.addField('ID', msg12.idString, true)
					.addField('NICK', msg12.nickString, true)
					.addField('PING', msg12.pingString, true)
					await listChannel.send({embed: msg12.embed})
				}
				if(msg13.idString != ''){
					let newmsg1embed = msg13.embed
					newmsg1embed
					.addField('ID', msg13.idString, true)
					.addField('NICK', msg13.nickString, true)
					.addField('PING', msg13.pingString, true)
					await listChannel.send({embed: msg13.embed})
				}
				if(msg14.idString != ''){
					let newmsg1embed = msg14.embed
					newmsg1embed
					.addField('ID', msg14.idString, true)
					.addField('NICK', msg14.nickString, true)
					.addField('PING', msg14.pingString, true)
					await listChannel.send({embed: msg14.embed})
				}
				if(msg15.idString != ''){
					let newmsg1embed = msg15.embed
					newmsg1embed
					.addField('ID', msg15.idString, true)
					.addField('NICK', msg15.nickString, true)
					.addField('PING', msg15.pingString, true)
					await listChannel.send({embed: msg15.embed})
				}
				if(msg16.idString != ''){
					let newmsg1embed = msg16.embed
					newmsg1embed
					.addField('ID', msg16.idString, true)
					.addField('NICK', msg16.nickString, true)
					.addField('PING', msg16.pingString, true)
					await listChannel.send({embed: msg16.embed})
				}
			}
		}).catch(function(error) {
			playersCount = 'OFF'
			policeCount = 0
			ambulanceCount = 0
		});
	})
	
	
}
client.on("ready", async() => {
	await updateStatus();
	setInterval(async() => {
		await updateStatus();
    }, 10000);
});
client.on("ready", async() => {
	await updatePlayerList();
	setInterval(async() => {
		await updatePlayerList();
    }, 60000);
});


console.log('\x1b[36mBOT\x1b[0m @ \x1b[32mLoaded statusUpdater \x1b[0m');