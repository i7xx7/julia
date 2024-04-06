const { Events, AuditLogEvent } = require('discord.js');
const { logAll } = require('../../myJsonDatabase/myChannels.json')

module.exports = {
	name: Events.ChannelDelete,
	once: true,
	async execute(interaction){
		
        const logChannelCreate = await interaction.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete })
        const entry = logChannelCreate.entries.first()
        const action = entry.actionType === 'Create' ? 'Criado' : 'Excluido'

        const reply = {
            color: 16777215,
            author: {
                name: `${entry.executor.username}`,
                icon_url: `https://cdn.discordapp.com/avatars/${entry.executor.id}/${entry.executor.avatar}`
            },
            title: 'Sistema de Logs: Canais',
            description: `> Tipo de Ação: \`${action}\` \n > Tipo de Canal: \`${entry.target.type}\` `,
            fields: [
                {
                    name: `Canal Excluido Por`,
                    value: ` \`\`\` ${entry.executor.username} (${entry.executor.id}) \`\`\` `
                },
                {
                    name: `Nome & ID do Canal`,
                    value: ` \`\`\`${entry.target.name} (${entry.targetId})\`\`\`  `
                }
            ],
            timestamp: new Date().toISOString()
	    }

        const channel = interaction.client.channels.cache.get(logAll);
        channel.send({ embeds: [reply] });

        
    }
};