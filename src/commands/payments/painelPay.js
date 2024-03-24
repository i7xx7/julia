const { SlashCommandBuilder,  StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('payment')
		.setDescription('Painel de Payments'),
	async execute(interaction) {
        const embed = {
            color: 16777215,
            title: 'Realizar a Compra do Painel',
            description: '> Veja nossos planos e realize a compra semi-auto'
        }

        const select = new StringSelectMenuBuilder()
			.setCustomId('pay')
			.setPlaceholder('Selecione o Plano ⭣ ')
			.setMaxValues(1)
			.setMinValues(1)
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Plano Gold')
					.setDescription('R$35.99 Por Mês.')
				    .setValue('gold'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Plano Classic')
					.setDescription('R$15.99 Por Mês.')
					.setValue('classic'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Plano Basic')
					.setDescription('R$10.99 Por Mês.')
					.setValue('basic')
			);

        const row = new ActionRowBuilder().addComponents(select)
        

        await interaction.reply({ embeds: [embed], components: [row] })

    }
}