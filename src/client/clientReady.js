const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
	execute(client) {
		console.log(`Logado como: ${client.user.tag}`);
	},
};