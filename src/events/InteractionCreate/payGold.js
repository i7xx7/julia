const { Events, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const { staffRole, clientRole } = require('../../database/Json/myRoles.json')
const { logVendas } = require('../../database/Json/myChannels.json')
const { produtos, valores } = require('../../database/Json/myProdutos.json')
const { carrinho, books, server } = require('../../database/Json/myEmojis.json')
const wait = require('node:timers/promises').setTimeout;
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if(interaction.isStringSelectMenu()){
            
            if(interaction.values == 'gold'){

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
			        .setCustomId('confirmarpag')
			        .setLabel('Confirmar Pagamento')
                    .setEmoji(server.allow)
			        .setStyle(ButtonStyle.Success);

			    const fecharcarr = new ButtonBuilder()
			        .setCustomId('closecar')
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
            if(interaction.customId === 'confirmarpag') {

                if(interaction.member.roles.cache.has(staffRole)) {

                    await interaction.reply({ content: `Autorizando pagamento...` })

                    const embed = {

                        color: 16777215,
                        title: 'Pagamento Aprovado!',
                        description: '> Com o pagamento aprovado, basta aguardar em torno de 20/35 Minutos a entrega do produto neste mesmo chat.',
                        fields: [
                            {
                                name: `${books} Detalhes Produto:`,
                                value: ` \`\`\` Produto: ${produtos.produto1} | Valor: ${valores.valor1} \`\`\` `
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
                            value: ` \`\`\` ${produtos.produto1} \`\`\` `
                        },
                        {
                            name: `Valor Pago`,
                            value: ` \`\`\` ${valores.valor1} \`\`\` `
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