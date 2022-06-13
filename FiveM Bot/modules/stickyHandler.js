let lastStickyProposition = null
var propoId = 0;

delMsg = async(message, msgId)=>{
    await message.channel.messages.fetch({around: msgId, limit: 1})
	.then(async messages => {
		const fetchedMsg = messages.first();
		await fetchedMsg.delete();
	});
	
};

client.on("message", async message => { 
	if(message.author.bot) return;
	if(!message.guild) return;
	if(message.guild.id != config.discordGuild) return;
	if(message.channel == client.channels.cache.get(config.propositionChannel)){
		propoId = propoId + 1
		if(propoId < 5){return}
		propoId = 0;
		message.channel.messages.fetch({ limit: 1 }).then(async messages => {
			let lastMessage = messages.first();
			if(lastMessage.author.bot) return;
			if(lastStickyProposition != null){delMsg(message,lastStickyProposition.id)}
			lastStickyProposition = await message.channel.send('**:warning: __IMPORTANT :warning: - Read__**\n'+config.stickyProposition);
		})
		.catch(console.error);
	}
	
	if(stickiedMessages[message.channel.id] != null){
		stickiedMessages[message.channel.id].count = stickiedMessages[message.channel.id].count + 1
		if(stickiedMessages[message.channel.id].count < 8){return}
		stickiedMessages[message.channel.id].count = 0;
		message.channel.messages.fetch({ limit: 1 }).then(async messages => {
			let lastMessage = messages.first();
			if(lastMessage.author.bot) return;
			if(stickiedMessages[message.channel.id] != null){
				if(stickiedMessages[message.channel.id].message != null){
					await delMsg(message, stickiedMessages[message.channel.id].message.id)
					stickiedMessages[message.channel.id] = {text : stickiedMessages[message.channel.id].text, message: await message.channel.send('**:warning: ____IMPORTANT :warning: - Read__**\n'+stickiedMessages[message.channel.id].text), count : 0}
				}
				
			}
		})
		.catch(console.error);
	}
	
});

client.on("ready", async() => {
	let channel = client.channels.cache.get(config.propositionChannel)
		propoId = 0;
		channel.messages.fetch({ limit: 1 }).then(async messages => {
			let lastMessage = messages.first();
			if(lastMessage.author.bot) return;
			if(lastStickyProposition != null){delMsg(message,lastStickyProposition.id)}
			lastStickyProposition = await channel.send('**:warning: __IMPORTANT :warning: - Read__**\n'+config.stickyProposition);
		})
		.catch(console.error);

});
	
	


console.log('\x1b[36mBOT\x1b[0m @ \x1b[32mLoaded stickyHandler \x1b[0m');