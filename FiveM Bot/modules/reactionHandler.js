const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};



client.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;
    const { d: data } = event;
    const user = client.users.cache.get(data.user_id);
    const channel = client.channels.cache.get(data.channel_id);
    const message = await channel.messages.fetch(data.message_id);
	if(channel != client.channels.cache.get(config.propositionChannel)) return;
	if(message.author.bot) return;
	if(user != null && user.bot) return;
    const member = message.guild.members.cache.get(user.id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	if(channel != client.channels.cache.get(config.propositionChannel)) return;
	if (event.t === "MESSAGE_REACTION_ADD"){ 
		if(emojiKey == '👍'){
			if(!member.roles.cache.some(r=>["Owner", "BOTTeam","Zarząd"].includes(r.name)) ){
				await message.reactions.cache.get("👍").users.remove(user);
				return
			}
			await embed(message, '<@'+message.author.id+'>, twoja propozycja została **zaakceptowana** przez <@'+data.user_id+'>.');

			await message.reactions.cache.get("👍").remove();
			await message.reactions.cache.get("👎").remove();
			await message.reactions.cache.get("❌").remove();
		}else if(emojiKey == '👎'){
			if(!member.roles.cache.some(r=>["Owner", "BOTTeam","Zarząd"].includes(r.name)) ){
				await message.reactions.cache.get("👎").users.remove(user);
				return
			}
			await embedRed(message, '<@'+message.author.id+'>, twoja propozycja została **odrzucona** przez <@'+data.user_id+'>.');
			
			await message.reactions.cache.get("👍").remove();
			await message.reactions.cache.get("👎").remove();
			await message.reactions.cache.get("❌").remove();
		}else if(emojiKey == '❌'){
			if(!member.roles.cache.some(r=>["Owner", "BOTTeam","Zarząd"].includes(r.name)) ){
				await message.reactions.cache.get("❌").users.remove(user);
				return
			}
			await message.delete()
		}
	};
});


console.log('\x1b[36mBOT\x1b[0m @ \x1b[32mLoaded reactionHandler \x1b[0m');