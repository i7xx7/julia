const { Events, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { server } =  require('../../database/Json/myEmojis.json')
const { QuickDB } = require("quick.db");
const db = new QuickDB();

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
                await db.set(`autorpost`, `${autor}`)
            
                msg.delete()
                const webhook = interaction.channel.createWebhook({
                    name: `${name}`,
                    avatar: `https://cdn.discordapp.com/avatars/${autor}/${avatar}`,
                }).then(async (web) => {

                    const curtirpubli = new ButtonBuilder()
			        .setCustomId('curtir')
			        .setLabel('0')
                    .setEmoji(server.curtida)
			        .setStyle(ButtonStyle.Secondary);

			        const comentarpubli = new ButtonBuilder()
			        .setCustomId('comentar')
			        .setLabel('0')
                    .setEmoji(server.comentar)
			        .setStyle(ButtonStyle.Secondary);

                    const vercurtidas = new ButtonBuilder()
			        .setCustomId('vercurtidas')
                    .setEmoji(server.vercurtidas)
			        .setStyle(ButtonStyle.Secondary);

                    const vercomens = new ButtonBuilder()
			        .setCustomId('vercomen')
                    .setEmoji(server.vercoments)
			        .setStyle(ButtonStyle.Secondary);

                    const excluirpubli = new ButtonBuilder()
			        .setCustomId('excluirpost')
                    .setEmoji(server.deletepost)
			        .setStyle(ButtonStyle.Secondary);

                    const row = new ActionRowBuilder().addComponents(curtirpubli, comentarpubli, vercurtidas, vercomens, excluirpubli)


                    await web.send({
                        content: `> <@${autor}>:${content}`,
                        files: [`${img}`],
                        components: [row]
                    })

                    const id = web.id
                    
                    web.delete()
                })
            
            }
        } else {
           interaction.delete()
        }
    }
}