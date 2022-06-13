client.on("message", async message => { 
	if(message.author.bot) return;
	if(!message.guild) return;
	if(message.guild.id != config.discordGuild) return;
	if(message.channel == client.channels.cache.get(config.propositionChannel)){
		const args = message.content.trim().split(/ +/g);
		let mess = args.join(" ");
		let currentdate = new Date().toLocaleTimeString('en-US', { hour12: false,  hour: "numeric", minute: "numeric"});
		let embedPool = new Discord.MessageEmbed()
		.setDescription(mess)
		.setColor(0x00ff00)
        .setAuthor(message.author.tag, message.member.user.avatarURL())
        .setFooter('BOT @ '+currentdate)
		let newMsg =  await message.channel.send({embed: embedPool });
		newMsg.react('✅').then(() => newMsg.react('❎')).then(() => newMsg.react('❌'));
		const filter = (reaction, user) => { //user.id
			let member = client.guilds.cache.get(config.discordGuild).members.cache.fetch(user.id); 
            return (['✅', '❎','❌'].includes(reaction.emoji.name) && member2.roles.cache.some(r=>["〔👑〕Owner","Zarząd",'BOTTeam'].includes(r.name)));
        };
		newMsg.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
          .then(async collected => {
              const reaction = collected.first();

				if (reaction.emoji.name === '✅') {
                 //  embedPool.setColor(0x00ff00)
                 //  newMsg.edit(embed)
				 //  newMsg.reactions.removeAll();
				}else if(reaction.emoji.name === '❎'){
				   
				}else if(reaction.emoji.name === '❌'){
					//newMsg.delete();
					await message.delete()
				}
          })
          .catch(collected => {

          });
		await message.delete()
	}
});


console.log('\x1b[36mBOT\x1b[0m @ \x1b[32mLoaded propositionHandler \x1b[0m');