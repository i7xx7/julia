const { Events, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

        if(interaction.isStringSelectMenu()){
            const selection = interaction.values
            if(selection == 'gold'){

                await interaction.reply({ content: `Aguarde....`, ephemeral: true })
                const thread = await interaction.channel.threads.create({
                    name: `🛒・${interaction.user.username}・${interaction.user.id}`,
                    autoArchiveDuration: 60,
                    type: ChannelType.PrivateThread,
                    reason: 'Realizar a compra de um produto',
                });

                await interaction.editReply({ content: `Carrinho de Compra Criado: <#${thread.id}>`, ephemeral: true })

                const embed = {
                    color: 16777215,
                    title: 'Pagamento via PIX criado',
                    description: '```ABCDEFGHIJKLMNOPQRTUVWXYZ12345678910123456789```',
                    image: {
                        url: 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSh-wrQu254qFaRcoYktJ5QmUhmuUedlbeMaQeaozAVD4lh4ICsGdBNubZ8UlMvWjKC',
                    },
                    footer: {
                        text: 'Após realizar o pagamento envie o comprovante no chat para realizarmos a confirmação'
                    },
                    timestamp: new Date().toISOString()
                }

                const confirmpag = new ButtonBuilder()
			        .setCustomId('confirmarpag')
			        .setLabel('Confirmar Pagamento')
			        .setStyle(ButtonStyle.Success);

			    const fecharcarr = new ButtonBuilder()
			        .setCustomId('fecharcarr')
			        .setLabel('Fechar Carrinho')
			        .setStyle(ButtonStyle.Danger);

                const row = new ActionRowBuilder().addComponents(confirmpag, fecharcarr)

                thread.send({ content: `${interaction.user}<@1178523910862549033>`, embeds: [embed], components: [row] })
            }
        }
        else {
            return;
        }
    }
}