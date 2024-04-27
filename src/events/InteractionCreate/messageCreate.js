const { Events, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	once: true,
	async execute(interaction){
        if(interaction.channel == '1233611864957653033'){
            if(interaction.attachments.size >= 1){
                const img = interaction.attachments.first().url
                const msg = interaction
                const content = msg.content ? `\${msg.content}` : ''
                const autor = msg.author.id
                const name = msg.author.username
                const avatar = msg.author.avatar

            
                msg.delete()
                const webhook = interaction.channel.createWebhook({
                    name: `${name}`,
                    avatar: `https://cdn.discordapp.com/avatars/${autor}/${avatar}`,
                }).then(async (web) => {


                    const curtirpubli = new ButtonBuilder()
			        .setCustomId('curtir')
			        .setLabel('0')
                    .setEmoji('❤')
			        .setStyle(ButtonStyle.Secondary);

			        const comentarpubli = new ButtonBuilder()
			        .setCustomId('comentar')
			        .setLabel('0')
                    .setEmoji('💭')
			        .setStyle(ButtonStyle.Secondary);

                    const vercurtidas = new ButtonBuilder()
			        .setCustomId('vercurtidas')
                    .setEmoji('❤')
			        .setStyle(ButtonStyle.Secondary);

                    const vercomens = new ButtonBuilder()
			        .setCustomId('vercomen')
                    .setEmoji('💭')
			        .setStyle(ButtonStyle.Secondary);

                    const excluirpubli = new ButtonBuilder()
			        .setCustomId('excluirpubli')
                    .setEmoji('❌')
			        .setStyle(ButtonStyle.Secondary);

                    const row = new ActionRowBuilder().addComponents(curtirpubli, comentarpubli, vercurtidas, vercomens, excluirpubli)


                    await web.send({
                        content: `> <@${autor}>:${content}`,
                        files: [`${img}`],
                        components: [row]
                    })
                    web.delete()
                })
            
            }
        } else {
           return;
        }
    }
}