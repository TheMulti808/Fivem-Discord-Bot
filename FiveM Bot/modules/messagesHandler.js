alreadyUsedWL = {}
embedSTART = async(message, args)=>{
       
    let embed = new Discord.MessageEmbed()
    .setDescription(args)
    .setColor(0x00ff00)
    let msg = message.channel.send({ embed: embed })
	.catch(function(e){
		console.log(e)
	})
    return msg;

};
client.on("message", async message => { //'+config.serverName+'
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefixGlobal) !== 0) return;
	if(!message.guild) return;
	//if(message.guild.id != config.discordGuild) return;
	const args = message.content.slice(global.config.prefixGlobal.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	let ownerRole = message.guild.roles.cache.get("605419020811894794")
	
	switch(command){
	case 'cm':
		if(message.channel != client.channels.cache.get('695212535627907113')){
			await message.delete()
			return await zembed(message, 'Tego użyć możesz tylko na <#695212535627907113>')
		}
		if(message.member.roles.cache.some(r=>["Community Member"].includes(r.name)) ){
			await message.delete()
			return await zembed(message, 'Już dostałeś tą role!')
		}
		let memberRole = message.guild.roles.cache.get("842792070673465385")
		await message.member.roles.add(memberRole)
		message.reply('Została ci nadana rola `Community Member`!')
		break;
	case 'addwl':
		if(!message.member.roles.cache.some(r=>["〔🧾〕Whitelist", "BOTTeam","Zarząd"].includes(r.name)) ){
			await message.delete()
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!')
		}
		if(args[0] == null){
			await message.delete()
			return await zembed(message, 'Podaj HEX osoby dodawanej! **(bez przedrostka "steam:")**\n**Przykład**: /addwl 110000108a8d43c Zielu#2115')
		}
		if(args[1] == null){
			await message.delete()
			return await zembed(message, 'Podaj NICK osoby dodawanej! **(bez spacji!)**\n**Przykład**: /addwl 110000108a8d43c Zielu#2115')
		}
		let embedWL = new Discord.MessageEmbed()
		.setDescription('**Dodawanie na WL**\n\n**Nick**: '+args[1]+'\n**Identifier**: steam:'+args[0]+'\n\n✅ - **Aby potwierdzić**\n❎ - **Aby anulować**\n*Masz 10 sekund*')
		.setColor(0x00ff00)
		let msgWL = await  message.channel.send({ embed: embedWL })
        msgWL.react('✅').then(() => msgWL.react('❎'))

        const filterWL = (reaction, user) => {
            return (['✅', '❎'].includes(reaction.emoji.name) && user.id === message.author.id);
        };

        msgWL.awaitReactions(filterWL, { max: 1, time: 10000, errors: ['time'] })
          .then(async collected => {
              const reaction = collected.first();

               if (reaction.emoji.name === '✅') {
					let newIdentifier = 'steam:'+args[0]
					let newNickname = args[1]
					await conn.query('INSERT INTO `user_whitelist`(identifier, nick, goldenticket) VALUES (?,?,?)',[newIdentifier, newNickname, 0], async function (error, results, fields) {
					if(error){
						if (error.code === 'ER_DUP_ENTRY') {
							let embedWL = new Discord.MessageEmbed()
							.setDescription('**'+args[1]+'**(steam:'+args[0]+') jest już na whiteliście!')
							.setColor(0xff0000)
						  await msgWL.edit(embedWL)
						  await  msgWL.reactions.removeAll();
						}else{
							//console.log(error)
							let embedWL = new Discord.MessageEmbed()
							.setDescription('Wystąpił nieoczekiwany błąd!')
							.setColor(0xff0000)
						   await msgWL.edit(embedWL)
						  await  msgWL.reactions.removeAll();
						}
					}else{
						let embedWL = new Discord.MessageEmbed()
							.setDescription('**'+args[1]+'**(steam:'+args[0]+') został wpisany na whiteliste!')
							.setColor(0x00ff00)
						   await msgWL.edit(embedWL)
						  await msgWL.reactions.removeAll();
					}});
			
			
			
                   let embedWL = new Discord.MessageEmbed()
					.setDescription('**'+args[1]+'**(steam:'+args[0]+') został dodany na whiteliste!')
					.setColor(0x00ff00)
                   await msgWL.edit(embedWL)
				   await msgWL.reactions.removeAll();
               }else if(reaction.emoji.name === '❎'){
				   let embedWL = new Discord.MessageEmbed()
					.setDescription('Anulowałeś dodawanie na **wl**!')
					.setColor(0xff0000)
                   await msgWL.edit(embedWL)
				   await msgWL.reactions.removeAll();
			   }
          })
          .catch(async collected => {
			 let embedWL = new Discord.MessageEmbed()
			.setDescription('Czas minął!')
			.setColor(0xff0000)
			await msgWL.edit(embedWL)
			await msgWL.reactions.removeAll();
          });
		
		
		
		await message.delete()
		break;
	case 'wl':
		if(message.channel != client.channels.cache.get('695212535627907113')){
			await message.delete()
			return await zembed(message, 'Tego użyć możesz tylko na <#695212535627907113>')
		}
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd","〔🧾〕Whitelist"].includes(r.name)) ){
			await message.delete()
			return await zembed(message, 'Musisz mieć WL aby użyć tej komendy!')
		}
		if(alreadyUsedWL[message.author.id] != null){
			await message.delete()
			return await zembed(message, 'Już użyłeś tej komendy!')
		}
		alreadyUsedWL[message.author.id] = true
		await conn.query('SELECT * from `baninfo` WHERE `baninfo`.`discord` LIKE ?',['%'+message.author.id+'%'], async function (error, results, fields) {
		if(error){
			//console.log('c')
			await message.channel.send('<@'+message.author+'>, wybacz ale wystąpil nieoczekiwany blad!')
			await message.member.send('<@'+message.author+'>, wybacz ale wystąpil nieoczekiwany blad!').catch();
			  
		}else{
			if(results == null || results[0] == null){ console.log('d') ;return zembed(message,'<@'+message.author+'>, nie znaleźliśmy Cie w bazie danych, zgłoś się do kogoś z administracji!')}
			let newIdentifier = results[0].identifier
			await conn.query('INSERT INTO `user_whitelist`(identifier, nick, goldenticket) VALUES (?,?,?)',[newIdentifier, message.author.tag, 0], async function (error, results, fields) {
			if(error){
					//console.log('b')
				if (error.code === 'ER_DUP_ENTRY') {
					await message.member.send('<@'+message.author+'>, hej, już jesteś wpisany!!').catch();
				}else{
					await message.member.send('<@'+message.author+'>, wybacz ale wystąpil nieoczekiwany blad podczas wpisywania Cie na whiteliste, zglos sie do administracji!!').catch();
				}
			}else{
				//console.log('a')
				await message.channel.send('<@'+message.author+'>, twój identifier to: **'+newIdentifier+'**\nZostałeś wpisany na whiteliste, server ją odświeża co **10** minut!').catch();
				await message.member.send('<@'+message.author+'>, twój identifier to: **'+newIdentifier+'**\nZostałeś wpisany na whiteliste, server odświeża ją co **10** minut!').catch();
			}});
		}});
		await message.delete()
		break;	
	case 'pool':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!')
		}
		let currentdate = new Date().toLocaleTimeString('en-US', { hour12: false,  hour: "numeric", minute: "numeric"});
		let mess = args.join(" ");
		let embedPool = new Discord.MessageEmbed()
		.setDescription(mess)
		.setColor(0x00ff00)
		.setThumbnail('https://BOT.pl/img/logonew.png')
        .setAuthor('Głosowanie', 'https://BOT.pl/img/logonew.png')
        .setFooter('BOT @ '+currentdate)
		let msgPool =  await message.channel.send({content: '**Ankieta**', embed: embedPool });
		msgPool.react('✅').then(() => msgPool.react('❎'));
		await message.delete()
		break;
	case 'pooleveryone':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!')
		}
		let currentdate2 = new Date().toLocaleTimeString('en-US', { hour12: false,  hour: "numeric", minute: "numeric"});
		let mess2 = args.join(" ");
		let embedPool2 = new Discord.MessageEmbed()
		.setDescription(mess2)
		.setColor(0x00ff00)
		.setThumbnail('https://BOT.pl/img/logonew.png')
        .setAuthor('Głosowanie', 'https://BOT.pl/img/logonew.png')
        .setFooter('BOT @ '+currentdate2)
		let msgPool2 =  await message.channel.send({content: '@everyone', embed: embedPool2 });
		msgPool2.react('✅').then(() => msgPool2.react('❎'));
		await message.delete()
		break;
	case 'unbanall':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!')
		}
		message.guild.fetchBans().then(bans => {
                    if (bans.size == 0) {message.reply("There are no banned users.")};
                    bans.forEach(ban => {
                        message.guild.members.unban(ban.user.id);
                    });
                }).then(() => message.reply("Unbanned all users.")).catch(e => console.log(e))
		await message.delete()
		break;
	case 'amoze':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!')
		}
		let embed = new Discord.MessageEmbed()
		.setDescription('Moze tak czy moze nie?\n✅ - **Aby potwierdzić**\n❎ - **Aby anulować**\n*Masz 10 sekund*')
		.setColor(0x00ff00)
		let msg = await  message.channel.send({ embed: embed })
        msg.react('✅').then(() => msg.react('❎'))

        const filter = (reaction, user) => {
            return (['✅', '❎'].includes(reaction.emoji.name) && user.id === message.author.id);
        };

        msg.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
          .then(collected => {
              const reaction = collected.first();

               if (reaction.emoji.name === '✅') {
                   let embed = new Discord.MessageEmbed()
					.setDescription('No dobra!')
					.setColor(0x00ff00)
                   msg.edit(embed)
				   msg.reactions.removeAll();
               }else if(reaction.emoji.name === '❎'){
				   let embed = new Discord.MessageEmbed()
					.setDescription('No chyba nie')
					.setColor(0xff0000)
                   msg.edit(embed)
				   msg.reactions.removeAll();
			   }
          })
          .catch(collected => {
			 let embed = new Discord.MessageEmbed()
			.setDescription('Czas minął!')
			.setColor(0xff0000)
			msg.edit(embed)
			msg.reactions.removeAll();
          });
		
		
		
		await message.delete()
		break;	
	case 'status':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!')
		}
		if (args[0]){
			switch(args[0]){
				case 'set':
					let newText = '/status set '
					let text2 = message.content.slice(newText.length);
					config.enableCustomStatus = true;
					config.customStatus = text2;
					await message.reply(' ustawił status na: \n```'+text2+'```');
					await message.delete();
					break;
				case 'clear':
					config.enableCustomStatus = false;
					config.customStatus = '';
					await message.reply(' wyczyścił poprzedni status.');
					await message.delete();
					break;
				default:
					await zembed(message, '**Składnia**: /status [set||clear] [nowy status]')
					await message.delete()
					break;
			}

		}else{
			await zembed(message, '**Składnia**: /status [set||clear] [nowy status]')
			await message.delete()
		}
		break;	
	case 'blank':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner", "BOTTeam","Zarząd"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!')
		}
		await embed(message,'> Pusty embed :) <@294985121969340417> ')
		await message.delete()
		break;	
	case 'ip':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner", "BOTTeam","Zarząd"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!')
		}
		await embed(message,'**Ip servera**: '+config.serverIp+'\n**Regulamin**: [Klik](https://BOT.pl/rules) ')
		await message.delete()
		break;
	case 'zaakceptowane':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner", "BOTTeam","Zarząd"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!')
		}
		if (args[0]){
			let reason = 'Brak powodu.'
			if(args[1]){
				let newstring = '/zaakceptowane '+args[0]
				let text = message.content.slice(newstring.length);
				reason = text
			}
			await message.channel.send(args[0]+`, *twoje podanie zostalo* **zaakceptowane** *przez* ${message.author.toString()}\n **Powód**: ${reason}`).then((message) => {
				let user = message.mentions.users.first();
				user.send(args[0]+`, *twoje podanie zostalo* **zaakceptowane** *przez* ${message.author.toString()}\n **Powód**: ${reason}`);
			})
		}else{
			await zembed(message, 'Oznacz osobe!\n**Przyklad**: /zaakceptowane @BOT [Powód]')
		}
		await message.delete()
		break;	
	case 'odrzucone':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner", "BOTTeam","Zarząd"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!')
		}
		if (args[0]){
			let reason = 'Brak powodu.'
			if(args[1]){
				let newstring = '/odrzucone '+args[0]
				let text = message.content.slice(newstring.length);
				reason = text
			}
			await message.channel.send(args[0]+`, *twoje podanie zostalo* **odrzucone** *przez* ${message.author.toString()}\n **Powód**: ${reason}`).then((message) => {
				let user = message.mentions.users.first();
				user.send(args[0]+`, *twoje podanie zostalo* **odrzucone** *przez* ${message.author.toString()}\n **Powód**: ${reason}`);
			})
		}else{
			await zembed(message, 'Oznacz osobe!\n**Przyklad**: /odrzucone @BOT [Powód]')
		}
		await message.delete()
		break;	
	case 'poziom':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd","BOTTeam","PDHighCommand"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!')
		}
			let name = message.member.user.tag;
			if(args[1] != null && args[2] != null ){
				name = args[1]+' '+args[2]
			}
			switch(args[0]){
				case 'czarny':
					let embedd = new Discord.MessageEmbed()
					.addField(name,'**UWAGA OBYWATELE**\nZostaje wprowadzony poziom **czarny**.', true)
					.setColor(0x1c1c1c)
					await message.channel.send({ embed: embedd })
					await sendCommand('poziom czarny')
					await message.delete()
					break;				
				case 'czerwony':
					let embeddd = new Discord.MessageEmbed()
					.addField(name,'**UWAGA OBYWATELE**\nZostaje wprowadzony poziom **czerwony**.', true)
					.setColor(0xc40005)
					await message.channel.send({ embed: embeddd })
					await sendCommand('poziom czerwony')
					await message.delete()
					break;
				case 'pomaranczowy':
					let embedddd = new Discord.MessageEmbed()
					.addField(name,'**UWAGA OBYWATELE**\nZostaje wprowadzony poziom **pomaranczowy**.', true)
					.setColor(0xa55f1f)
					await message.channel.send({ embed: embedddd })
					await sendCommand('poziom pomaranczowy')
					await message.delete()
					break;				
				case 'zielony':
					let embeddddd = new Discord.MessageEmbed()
					.addField(name,'**UWAGA OBYWATELE**\nZostaje wprowadzony poziom **zielony**.', true)
					.setColor('56108')
					await message.channel.send({ embed: embeddddd })
					await sendCommand('poziom zielony')
					await message.delete()
					break;
				default:
					await zembed(message, 'Dostepne poziomy: zielony, pomaranczowy, czerwony, czarny');
					await message.delete({ timeout: 1 });
					break;
			}
		break;
	case 'revive':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd","BOTTeam", "〔🥼〕WL Checker"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!');
		}
		if(args[0] == null){
			await message.delete()
			return await zembed(message, 'Nie podales prawidlowego argumentu!')
		}else{
			await message.channel.send( 'Wykonano komende: **revive '+args[0]+'**!')
			await sendCommand('rev '+args[0])
		}
		await message.delete()
		break;	
		
	case 'spawn':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd","BOTTeam"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!');
		}
		if(args[0] == null){
			await message.delete()
			return await zembed(message, 'Nie podales prawidlowego argumentu!')
		}else{
			await message.channel.send( 'Wykonano komende: **spawn '+args[0]+'**!')
			await sendCommand('rev '+args[0])
		}
		await message.delete()
		break;	
	case 'skin':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd","BOTTeam"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!');
		}
		if(args[0] == null){
			await message.delete()
			return await zembed(message, 'Nie podales prawidlowego argumentu!')
		}else{
			await message.channel.send( 'Wykonano komende: **skin '+args[0]+'**!')
			await sendCommand('skinnewdsc '+args[0])
		}
		await message.delete()
		break;	
	case 'kick':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd","BOTTeam"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!');
		}
		if(args[0] == null){
			await message.delete()
			return await zembed(message, 'Nie podales prawidlowego argumentu!')
		}else{
			await message.channel.send( 'Wykonano komende: **kick '+args[0]+'**!')
			await sendCommand('kickdsc '+args[0])
		}
		await message.delete()
		break;	
	case 'ban':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd","BOTTeam"].includes(r.name)) ){
			await message.delete()
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!');
		}
		if(args[0] == null){
			await message.delete()
			return await zembed(message, 'Nie podales prawidlowego argumentu!')
		}
		let id = args[0]
		if(args[1] == null){
			await message.delete()
			return await zembed(message, 'Nie podales prawidlowego drugiego argumentu!')
		}
		let time = args[1]
		var reason = args;
		reason.splice(0, 2);

		await message.channel.send( 'Wykonano komende: **ban '+id+' '+time+' '+reason+'**!')
		await sendCommand('ban:add '+id+' '+time+' '+reason)
			
		await message.delete()
		break;	
	case 'announce':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd","BOTTeam"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!');
		}
		if(args[0] == null){
			await message.delete()
			return await zembed(message, 'Nie podales prawidlowego argumentu!')
		}else{
			await message.channel.send( 'Wykonano komende: **Announce: '+args.join(" ")+'**!')
			await sendCommand('say '+args.join(" "))
		}
		await message.delete()
		break;
	case 'addsticky':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd","BOTTeam"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!');
		}
		if(args[0] == null){
			await message.delete()
			return await zembed(message, 'Nie podales prawidlowego argumentu!')
		}else{
			stickiedMessages[message.channel.id] = {text : args.join(" "), message: await message.channel.send('**:warning: __WAŻNA WIADOMOŚĆ :warning: - Przeczytaj__**\n'+args.join(" ")), count : 0}
			
			/*await message.channel.send('**Przyklejona wiadomość:**\n'+args.join(" "))
			.then((message) => {
				stickiedMessages[message.channel.id] = {text : args.join(" "), message: message.id}
			})*/
			//stickiedMessages[message.channel.id].messageId = stickiedMessages[message.channel.id].message.id
		}
		await message.delete()
		break;
	case 'removesticky':
		if(!message.member.roles.cache.some(r=>["〔👑〕Owner","Zarząd","BOTTeam"].includes(r.name)) ){
			return await zembed(message, 'Nie masz permisji do uzywania tej komendy!');
		}
		if(stickiedMessages[message.channel.id].message != null){stickiedMessages[message.channel.id].message.delete()}
		if(stickiedMessages[message.channel.id] != null){stickiedMessages[message.channel.id] = null}
		await message.delete()
		await zembed(message,'Usunięto przyklejoną wiadomość!')
		break;
	default:
		break;
	}
	
});


	

		
console.log('\x1b[36mBOT\x1b[0m @ \x1b[32mLoaded messagesHandler \x1b[0m');