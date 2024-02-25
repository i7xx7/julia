
const { SlashCommandBuilder } = require('discord.js');

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coins')
		.setDescription('Veja seus coins atuais'),
	async execute(interaction, userData) {
		const { coins } = userData;
		user = interaction.user
		console.log(userData.daily)
		const reply = {
			color: 16777215,
			description: `${user}, você possui atualmente ${coins} coins`,
			timestamp: new Date().toISOString(),
	        footer: {
		        text: `${user.username} (${user.id})`,
		        icon_url: `${user.displayAvatarURL({ extension: 'jpg' })}`,
	        },
		}
		await interaction.reply({ embeds: [reply], ephemeral: true  })
const { SlashCommandBuilder } = require('discord.js');
const schema = require('../../Schemas/coins')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ver')
		.setDescription('Veja seus coins atuais'),
	async execute(interaction) {
		const user = interaction.user
		const userData = await schema.findOne({ iduser: user.id })
		if (userData == null){
			const newUser = await schema.updateOne({ iduser: user.id }, { $set: { coins: 0 }, { _id: user.id } }, {  upsert: true })
			await interaction.reply({ content: ` \`OBS:\` Você não possuia uma conta existente, com criei uma automaticamente\n Você possui \`oi\` `, ephemeral: true })
		} else {
			console.log('Nao')
		}

}};