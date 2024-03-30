const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("Quantidade de mensagens e horas em call")
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Usuario')),
  async execute(interaction) {
    const user = await interaction.options.getUser('user') || interaction.user;
    const timeInCall = 0;
    const messagesInServer = 0;
    const embed = {
        color: 16777215,
        title: `${user.username}`,
        description: `> O Usuario esteve em call por \` ${timeInCall} \` \n > O Usuario enviou \` ${messagesInServer} \` mensagens no total  `,
    };
    
    interaction.reply({ embeds: [embed], ephemeral: true })
  }
}