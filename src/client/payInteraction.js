const { Events, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const { staffRole, clientRole } = require('../myJsonDatabase/myRoles.json')
const { logVendas } = require('../myJsonDatabase/myChannels.json')
const { produto1, produto2, produto3 } = require('../myJsonDatabase/myProdutos.json')
const wait = require('node:timers/promises').setTimeout;
const { QuickDB } = require("quick.db");
const db = new QuickDB();

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
                
        	    await db.set(`carrin`, `${interaction.user.id}`)
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
			        .setCustomId('closecar')
			        .setLabel('Fechar Carrinho')
			        .setStyle(ButtonStyle.Danger);

                const row = new ActionRowBuilder().addComponents(confirmpag, fecharcarr)

                thread.send({ content: `${interaction.user}<@&1178523910862549033>`, embeds: [embed], components: [row] })
                
            }
            else if(selection == 'classic'){

                await interaction.reply({ content: `Aguarde....`, ephemeral: true })
                
                const thread = await interaction.channel.threads.create({

                    name: `🛒・${interaction.user.username}・${interaction.user.id}`,
                    autoArchiveDuration: 60,
                    type: ChannelType.PrivateThread,
                    reason: 'Realizar a compra de um produto',
                
                });
                
        	    await db.set(`carrin`, `${interaction.user.id}`)
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
			        .setCustomId('closecar')
			        .setLabel('Fechar Carrinho')
			        .setStyle(ButtonStyle.Danger);

                const row = new ActionRowBuilder().addComponents(confirmpag, fecharcarr)

                thread.send({ content: `${interaction.user}<@&1178523910862549033>`, embeds: [embed], components: [row] })
                
            }
            else if(selection == 'basic'){

                await interaction.reply({ content: `Aguarde....`, ephemeral: true })
                
                const thread = await interaction.channel.threads.create({

                    name: `🛒・${interaction.user.username}・${interaction.user.id}`,
                    autoArchiveDuration: 60,
                    type: ChannelType.PrivateThread,
                    reason: 'Realizar a compra de um produto',
                
                });
                
        	    await db.set(`carrin`, `${interaction.user.id}`)
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
			        .setCustomId('closecar')
			        .setLabel('Fechar Carrinho')
			        .setStyle(ButtonStyle.Danger);

                const row = new ActionRowBuilder().addComponents(confirmpag, fecharcarr)

                thread.send({ content: `${interaction.user}<@&1178523910862549033>`, embeds: [embed], components: [row] })
                
            }
        }

        else if(interaction.isButton()) {
            if(interaction.customId === 'confirmarpag') {

                if(interaction.member.roles.cache.has(staffRole)) {
                    const cliente = await db.get(`carrin`)

                    await interaction.reply({ content: `Autorizando pagamento...` })

                    const embed = {

                        color: 16777215,
                        title: 'Pagamento Aprovado!',
                        description: '> Com o pagamento aprovado, basta aguardar em torno de 20/35 Minutos a entrega do produto neste mesmo chat.',
                        fields: [
                            {
                                name: `Detalhes Produto:`,
                                value: ` \`\`\` ${produto1} \`\`\` `
                            }
                        ],
                        timestamp: new Date().toISOString()
                    
                    }

                    const finalizar = new ButtonBuilder()
			            .setCustomId('finalizar')
			            .setLabel('Finalizar Atendimento')
			            .setStyle(ButtonStyle.Danger);

                    const row = new ActionRowBuilder().addComponents(finalizar)
                    await interaction.editReply({ content: '', embeds: [embed], components: [row] })

                
                } else {

                    await interaction.reply({ content: `Você não pode realizar esta ação.`, ephemeral: true })
                
                }
            }

            else if(interaction.customId === 'closecar') {

                if(interaction.member.roles.cache.has(staffRole)) {

                    const channel = interaction.channel
                    if(channel.type === 12){
                        await channel.delete()
                    } else {
                        return;
                    }
                
                } else {

                    await interaction.reply({ content: `Você não pode realizar esta ação.`, ephemeral: true })
                
                }
            } else if(interaction.customId === 'finalizar'){
                const cliente = await db.get(`carrin`)

                const embed = {

                    color: 16777215,
                    title: 'Nova Compra Realizada!',
                    fields: [
                        {
                            name: `Carrinho`,
                            value: ` \`\`\` ${produto1} \`\`\` `
                        },
                        {
                            name: `Valor`,
                            value: ` \`\`\` R$35.99 Reais \`\`\` `
                        },
                        {
                            name: `Comprador`,
                            value: `<@${cliente}>`
                        }

                    ],
                    timestamp: new Date().toISOString()
                
                }

                const channel = interaction.client.channels.cache.get(logVendas);
                channel.send({ embeds: [embed] });
                const channelThread = interaction.channel
                    if(channelThread.type === 12){
                        await channelThread.delete()
                    } else {
                        return;
                    }

            }
        }
    }
}