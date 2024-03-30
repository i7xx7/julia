const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coins")
    .setDescription("Veja seus coins atuais"),
  async execute(interaction, userData) {
    const { coins } = userData;
    user = interaction.user;
    const reply = {
      color: 16777215,
      description: `${user}, você possui atualmente ${coins} coins`,
      timestamp: new Date().toISOString(),
      footer: {
        text: `${user.username} (${user.id})`,
        icon_url: `${user.displayAvatarURL({ extension: "jpg" })}`,
      },
    };
    
    await interaction.reply({ embeds: [reply], ephemeral: true });
  },
};
