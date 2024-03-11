const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mines')
		.setDescription('Painel de mines'),
	async execute(interaction, minesData) {
		const { dinheiro } = minesData;
		const user = interaction.user
		const owner = await interaction.guild.fetchOwner()

		if(interaction.user.id !== owner.id){
			console.log(interaction.guild.owner.id)
			await interaction.reply({ content: `${user}, você não possui permissão para realizar esta ação`, ephemeral: true })
		} else {
			const reply = {
				color: 16777215,
				title: '💣 Mines 💎',
				description: '- Verifique sempre os termos e condições para garantir uma experiência tranquila\n- Jogar com responsabilidade é fundamental para uma experiência positiva.'
			}

			const iniciar = new ButtonBuilder()
			.setCustomId('iniciar')
			.setLabel('Jogar')
			.setStyle(ButtonStyle.Secondary);

			const perfil = new ButtonBuilder()
			.setCustomId('perfil')
			.setLabel('Perfil')
			.setStyle(ButtonStyle.Secondary);

			const depositar = new ButtonBuilder()
			.setCustomId('dep')
			.setLabel('Depositar')
			.setStyle(ButtonStyle.Success);

			const sacar = new ButtonBuilder()
			.setCustomId('sac')
			.setLabel('Sacar')
			.setStyle(ButtonStyle.Danger);

			const row = new ActionRowBuilder().addComponents(iniciar, perfil, depositar, sacar);

			await interaction.reply({ content: 'Painel enviado com sucesso!', ephemeral: true })
			await interaction.channel.send({ embeds: [reply], components: [row] })
			
		}

}};