const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	once: true,
	async execute(interaction){
        if(interaction.channel == '1233611864957653033'){
            if(interaction.attachments.size >= 1){
                const img = interaction.attachments.first().url
                const msg = interaction
                const content = msg.content ? `${msg.content}` : ''
                const autor = msg.author.id
                msg.delete()

                
            }
        } else {
           return;
        }
    }
}