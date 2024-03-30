const { SlashCommandBuilder } = require('discord.js');
const data = require('../../database/Schemas/user')

module.exports = {
	cooldown: 80000,
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Resgate seus coins diariamente'),
	async execute(interaction, userData) {
		const {  coins } = userData;
		const user = interaction.user
        const coinsDaily = Math.floor(Math.random() * 450)
		
		await interaction.reply({ content: `Você ganhou no daily de hoje ${coinsDaily} coins`, ephemeral: true  })
		await data.findOneAndUpdate(
			{ _id: user.id }, 
			{ $set: { coins: coins + coinsDaily } } 
		)
}};