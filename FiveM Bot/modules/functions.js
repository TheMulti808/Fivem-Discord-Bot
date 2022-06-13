global.zembed = async(message, args) =>{
    let embed = new Discord.MessageEmbed()
    .setDescription(args)
    .setColor(0xff0000)
    message.channel.send({ embed: embed })
    .then(msg => {
        msg.delete({ timeout: 5000 })
    })
	.catch(function(e){
		console.log(e)
	})
    return;
};

global.embed = async(message, args)=>{
       
    let embed = new Discord.MessageEmbed()
    .setDescription(args)
    .setColor(0x00ff00)
    let msg = message.channel.send({ embed: embed })
	.catch(function(e){
		console.log(e)
	})
    return msg;

};
global.embedRed = async(message, args)=>{
       
    let embed = new Discord.MessageEmbed()
    .setDescription(args)
    .setColor(0xff0000)
    message.channel.send({ embed: embed })
	.catch(function(e){
		console.log(e)
	})
    return;

};
global.getEmojiDiscriminator = async(emoji)=>{
	if (emoji.id) {
		return `${emoji.name}:${emoji.id}`;
	} else {
		return emoji.name;
	}
}
global.sortByKey = function (array, key) {
	return array.sort(function(a, b) {
		var x = a[key]; var y = b[key];
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}

function fancyTimeFormat(time){   
	// Hours, minutes and seconds
	var hrs = ~~(time / 3600);
	var mins = ~~((time % 3600) / 60);
	var secs = ~~time % 60;
	// Output like "1:01" or "4:03:59" or "123:03:59"
	var ret = "";
	if (hrs > 0) {
		ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
	}
	ret += "" + mins + ":" + (secs < 10 ? "0" : "");
	ret += "" + secs;
	return ret;
}


console.log('\x1b[36mBOT\x1b[0m @ \x1b[32mLoaded functions \x1b[0m');