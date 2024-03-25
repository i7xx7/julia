const { Events, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const { staffRole, clientRole } = require('../myJsonDatabase/myRoles.json')
const { logVendas } = require('../myJsonDatabase/myChannels.json')
const { produtos, valores } = require('../myJsonDatabase/myProdutos.json')
const { carrinho, clienteEmoji, dinheiro, books, server } = require('../myJsonDatabase/myEmojis.json')
const wait = require('node:timers/promises').setTimeout;
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if(interaction.isStringSelectMenu()){
            
            if(interaction.values == 'basic'){

                await interaction.reply({ content: `Aguarde....`, ephemeral: true })
                
                const thread = await interaction.channel.threads.create({

                    name: `🛒・${interaction.user.username}・${interaction.user.id}`,
                    autoArchiveDuration: 60,
                    type: ChannelType.PrivateThread,
                    reason: 'Realizar a compra de um produto',
                
                });
                
        	    await db.set(`carrinClient`, `${interaction.user.id}`)
                await db.set(`nameClient`, `${interaction.user.username}`)
                await db.set(`avatarClient`, `${interaction.user.displayAvatarURL()}`)

                await interaction.editReply({ content: `Carrinho de Compra Criado: <#${thread.id}>`, ephemeral: true })
                

                const embed = {

                    color: 16777215,
                    title: 'Pagamento via PIX criado',
                    description: '**PIX COPIA E COLA:**\n```ABCDEFGHIJKLMNOPQRTUVWXYZ12345678910123456789```',
                    image: {
                        url: 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSh-wrQu254qFaRcoYktJ5QmUhmuUedlbeMaQeaozAVD4lh4ICsGdBNubZ8UlMvWjKC',
                    },
                    timestamp: new Date().toISOString()
                
                }

                const confirmpag = new ButtonBuilder()
			        .setCustomId('confirmarpag3')
			        .setLabel('Confirmar Pagamento')
                    .setEmoji(server.allow)
			        .setStyle(ButtonStyle.Success);

			    const fecharcarr = new ButtonBuilder()
			        .setCustomId('closecar3')
			        .setLabel('Fechar Carrinho')
                    .setEmoji(server.reject)
			        .setStyle(ButtonStyle.Danger);

                const row = new ActionRowBuilder().addComponents(confirmpag, fecharcarr)

                thread.send({ content: `${interaction.user}<@&1178523910862549033>`, embeds: [embed], components: [row] })
                thread.send({ content: `${interaction.user} Após efetuar o pagamento, envie o comprovante aqui.` })
                await wait(2_000)
                await interaction.deleteReply()
            }
            
            
        }

        if(interaction.isButton()) {
            if(interaction.customId === 'confirmarpag3') {

                if(interaction.member.roles.cache.has(staffRole)) {

                    await interaction.reply({ content: `Autorizando pagamento...` })

                    const embed = {

                        color: 16777215,
                        title: 'Pagamento Aprovado!',
                        description: '> Com o pagamento aprovado, basta aguardar em torno de 20/35 Minutos a entrega do produto neste mesmo chat.',
                        fields: [
                            {
                                name: `${books} Detalhes Produto:`,
                                value: ` \`\`\` Produto: ${produtos.produto3} | Valor: ${valores.valor3} \`\`\` `
                            }
                        ],
                        timestamp: new Date().toISOString()
                    
                    }

                    const finalizar = new ButtonBuilder()
			            .setCustomId('finalizar3')
			            .setLabel('Finalizar Atendimento')
			            .setStyle(ButtonStyle.Danger);

                    const row = new ActionRowBuilder().addComponents(finalizar)
                    await interaction.editReply({ content: '', embeds: [embed], components: [row] })

                
                } else {

                    await interaction.reply({ content: `Você não pode realizar esta ação.`, ephemeral: true })
                
                }
            }

            else if(interaction.customId === 'closecar3') {

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
            } else if(interaction.customId === 'finalizar3'){
                const clientOwnerCard = await db.get(`carrinClient`)
                const clientOwnerName = await db.get('nameClient')
                const clientOwnerAvatar =  await db.get('avatarClient')

                await interaction.guild.members.cache.get(clientOwnerCard).roles.add(clientRole);
                
                const embed = {

                    color: 16777215,
                    author: {
                        name: `${clientOwnerName}`,
                        icon_url: `${clientOwnerAvatar}`
                    },
                    title: `${carrinho} Nova Compra Realizada!`,
                    fields: [
                        {
                            name: `Carrinho`,
                            value: ` \`\`\` ${produtos.produto3} \`\`\` `
                        },
                        {
                            name: `Valor Pago`,
                            value: ` \`\`\` ${valores.valor3} \`\`\` `
                        }

                    ],
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: `${interaction.guild.name}`,
                        icon_url: `${interaction.guild.iconURL()}`
                    }
                
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