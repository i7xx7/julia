const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticketpannel")
    .setDescription("Pannel Ticket"),
  async execute(interaction) {
      const embed = {
        color: 16777215,
        title: 'Abrir um Ticket',
        description: 'Abra um ticket clicando no botao abaixo...',
      }

      const OpenTicket = new ButtonBuilder().setCustomId('openticket').setLabel('Abrir Ticket').setStyle(ButtonStyle.Secondary)
      const row = new ActionRowBuilder().addComponents(OpenTicket)

      await interaction.reply({ ephemeral: true, content: 'Painel enviado com sucesso!' })
      await interaction.channel.send({ components: [row], embeds: [embed] })
  },
};
