// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');

const { token } = require('./config.json');             // token of your bot
const { saloon } = require('./config.json');            // place where your bot indicate status & 1st level bot update
const { UserBotSaloon } = require('./config.json');     // place for 2nd level bot updates 
const { list } = require('./listBot.json');             // list of 1st level bot ID
const { UserBotList } = require('./listBot.json');      // list of 2nd level bot ID

// Create a new client instance
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildPresences,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.MessageContent
] });

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);


client.channels.fetch(saloon, false).then((channel) => {
	channel.send('Bot ONLINE')
//	console.log(channel)
	});
})

// Log in to Discord with your client's token
client.login(token);


// detection of a status change
client.on(Events.PresenceUpdate, (oldPresence, newPresence) => {
	var ID = newPresence.userId

// test for 1st level bot
	for (let i = 0; i < list.length+1; i++) {
		if (ID === list[i]) {
//			console.log('Detect');      // debug command
			var PresChange = client.users.cache.get(list[i]).tag;
			var PresBefore = oldPresence? oldPresence.status : 'no data';
			var PresAfter = newPresence? newPresence.status : 'no data';
			var FinalPres = PresChange + " have switch from " + PresBefore + " to " + PresAfter;
			console.log(FinalPres);     // "log" command
			client.channels.fetch(saloon, false).then((channel) => {
				channel.send(FinalPres);
			});
		}
	};

// test for 2nd level bot
	for (let i = 0; i < UserBotList.length+1; i++) {
//		console.log(i)                  //debug command
		if (ID === list[i]) {
//			console.log('Detect');      // debug command
			var PresChange = client.users.cache.get(list[i]).tag;
			var PresBefore = oldPresence? oldPresence.status : 'no data';
			var PresAfter = newPresence? newPresence.status : 'no data';
			var FinalPres = PresChange + " have switch from " + PresBefore + " to " + PresAfter;
			console.log(FinalPres);     // "log" command
			client.channels.fetch(UserBotSaloon, false).then((channel) => {
				channel.send(FinalPres);
			});
		}
	};
});