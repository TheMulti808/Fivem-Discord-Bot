global.token = 'your_token_here';
global.Discord = require("discord.js");
global.fetch = require("node-fetch");
global.client = new Discord.Client(); 
global.getJSON = require('get-json');
global.express = require('express');
global.mysql = require('mysql');
global.app = express();
global.parse = require('parse');
global.http = require('http');
global.stickiedMessages = {}
global.config = {
	discordGuild : 'your_discord_guild_here',
	propositionChannel : 'proposition_channel_id_here',
	serverIp : 'localhost:30120', //Your server IP and port, used to check playerlist and send commands directly to server
	serverName: 'Your Server Name',
	prefixGlobal : '/',
	showError : false,
	iconServer : '🍀',
	iconPolice : '🚓',
	iconAmbulance : '🚑',
	playerListChannel : 'player_list_channel_id',
	stickyProposition : 'Use search function before you write something. Thanks',
	enableCustomStatus: false, //Dont change
	customStatus : '',
	
	db_password: 'empty',
	db_name: 'empty'
	
	
}
const showErrors = true
async function loadErrorLog(moduleName) {
	console.log('\x1b[36mBOT\x1b[0m @ \x1b[41mError while loading '+moduleName+' \x1b[0m')
}



try { global.functions = require("./modules/functions.js"); } catch (e) { if(showErrors){console.log(e)}; loadErrorLog('functions'); }
try { global.databaseHandler = require("./modules/databaseHandler.js"); } catch (e) { if(showErrors){console.log(e)}; loadErrorLog('databaseHandler'); }
try { global.respondServer = require("./modules/respondServer.js"); } catch (e) { if(showErrors){console.log(e)}; loadErrorLog('respondServer'); }
try { global.statusUpdater = require("./modules/statusUpdater.js"); } catch (e) { if(showErrors){console.log(e)}; loadErrorLog('statusUpdater'); }
try { global.messagesHandler = require("./modules/messagesHandler.js"); } catch (e) { if(showErrors){console.log(e)}; loadErrorLog('messagesHandler'); }
try { global.stickyHandler = require("./modules/stickyHandler.js"); } catch (e) { if(showErrors){console.log(e)}; loadErrorLog('stickyHandler'); }
try { global.reactionHandler = require("./modules/reactionHandler.js"); } catch (e) { if(showErrors){console.log(e)}; loadErrorLog('reactionHandler'); }
try { global.propositionHandler = require("./modules/propositionHandler.js"); } catch (e) { if(showErrors){console.log(e)}; loadErrorLog('propositionHandler'); }


client.on("ready", () => {
  console.log(`\x1b[36mBOT\x1b[0m @ \x1b[32mFinally Loaded BOT as ${client.user.username}\x1b[0m`);
  client.user.setActivity('Loading bot...', { type: 'WATCHING' });
});
client.login(token);


process.on('unhandledRejection', err => console.log(err));

