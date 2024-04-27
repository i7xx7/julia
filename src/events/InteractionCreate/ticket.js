const { Events, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ChannelFlagsBitField, PermissionsBitField, IntentsBitField, UserSelectMenuBuilder, } = require('discord.js')
const { staffRole } = require('.././../database/Json/myRoles.json')
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if(interaction.isButton()){

            if(interaction.customId === 'openticket'){

                await db.set(`threadowner`, `${interaction.user.id}`)
                await db.set(`threadownerName`, `${interaction.user.username}`)
                const threadMenuStaff = new ButtonBuilder().setCustomId('threadmenustaff').setLabel('Menu Staff').setStyle(ButtonStyle.Secondary)
                const threadCloserTicket = new ButtonBuilder().setCustomId('threadclose').setLabel('Finalizar Ticket').setStyle(ButtonStyle.Secondary)
                const threadStaff = new ButtonBuilder().setCustomId('threadstaff').setLabel('Assumir Ticket').setStyle(ButtonStyle.Secondary)

                const rowThread = new ActionRowBuilder().addComponents(threadCloserTicket, threadStaff, threadMenuStaff)
                
                const embedThread = {
                    color: 16777215,
                    description: 'Aguarde até que algum staff assuma o ticket e voces possam resolver tal assunto, não fique mencionando os mesmos basta aguardar por favor.',
                    fields: [
                        {
                            name: 'Assumido por:',
                            value: 'Nenhum staff assumiu ainda...'
                        }
                    ]
                }
                await interaction.reply({ content: `Abrindo seu ticket aguarde alguns segundos...`, ephemeral: true })
                
                const thread = await interaction.channel.threads.create({

                    name: `📨・${interaction.user.username}・${interaction.user.id}`,
                    autoArchiveDuration: 60,
                    type: ChannelType.PrivateThread,
                    reason: 'Ticket',
                
                });


                const threadEmbedMessage = await thread.send({ components: [rowThread], content: `# TICKET・${interaction.user.username}`, embeds: [embedThread] })
                await db.set(`embedId`, `${threadEmbedMessage.id}`)
                const threadMentionsAdd = await thread.send(`${interaction.user}, <@&${staffRole}>`)
                threadMentionsAdd.delete()

                const OpenTicketChannel = new ButtonBuilder().setLabel('Ir ao Ticket').setStyle(ButtonStyle.Link).setURL(`https://discord.com/channels/${interaction.guild.id}/${thread.id}`)
                const row  = new ActionRowBuilder().addComponents(OpenTicketChannel)
                await interaction.editReply({ components: [row], content: `Ticket aberto: <#${thread.id}>`, ephemeral: true })

            } 
            
            else if (interaction.customId === 'threadclose'){
                if(interaction.member.roles.cache.has(staffRole)) {
                    await interaction.reply('Finalizando o Ticket...')
                    const channel = interaction.channel
                    if(channel.type === 12){
                        await channel.delete()
                    }
                }
                else {
                    await interaction.reply({ ephemeral: true, content: 'Apenas um staff consegue realizar esta ação' });
                }
                
            }

            else if(interaction.customId === 'threadstaff'){

                if(interaction.member.roles.cache.has(staffRole)) {
                    const embedThread = {
                        color: 16777215,
                        description: 'Aguarde até que algum staff assuma o ticket e voces possam resolver tal assunto, não fique mencionando os mesmos basta aguardar por favor.',
                        fields: [
                            {
                                name: 'Assumido por:',
                                value: `${interaction.user}`
                            }
                        ]
                    }
                    const threadMenuStaff = new ButtonBuilder().setCustomId('threadmenustaff').setLabel('Menu Staff').setStyle(ButtonStyle.Secondary)
                    const threadCloserTicket = new ButtonBuilder().setCustomId('threadclose').setLabel('Finalizar Ticket').setStyle(ButtonStyle.Secondary)
                    const threadStaff = new ButtonBuilder().setCustomId('threadstaff').setLabel('Assumir Ticket').setStyle(ButtonStyle.Secondary).setDisabled(true)

                    const rowThread = new ActionRowBuilder().addComponents(threadCloserTicket, threadStaff, threadMenuStaff)
                    const threadChannel = interaction.channel
                    const LastEmbedMessageId = await db.get(`embedId`)
                    const threadMessage = await threadChannel.messages.fetch(LastEmbedMessageId).then(msg => {
                        msg.edit({ embeds: [embedThread], components: [rowThread] })
                    })
            

                    await interaction.reply({ ephemeral: true, content: 'Ticket Assumido com Sucesso!' })
                    await db.set(`threadstaff`, `${interaction.user.id}`)
                }
                else {
                    await interaction.reply({ ephemeral: true, content: 'Apenas um staff consegue realizar esta ação' });
                }
            }

            else if(interaction.customId === 'threadmenustaff'){

                if(interaction.member.roles.cache.has(staffRole)) {

                const SelectMenuStaff = new StringSelectMenuBuilder()
                .setCustomId('selectmenustaff')
			    .setPlaceholder('Selecione a opção desejada: ')
			    .addOptions(
				    new StringSelectMenuOptionBuilder()
				    	.setLabel('Enviar Notificação')
                        .setValue('staffnotify'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Criar Canal de Voz')
					    .setValue('staffvoice')
                )
                const rowSelectMenuStaff = new ActionRowBuilder().addComponents(SelectMenuStaff)

                await interaction.reply({ ephemeral: true, components: [rowSelectMenuStaff]})
            }
            else {
                await interaction.reply({ ephemeral: true, content: 'Apenas um staff consegue realizar esta ação' });
            }

            }

        }

        else if(interaction.isStringSelectMenu()){
            const values = interaction.values

            if(values == 'staffnotify'){
                const userId = await db.get(`threadowner`)
                const LastEmbedMessageId = await db.get(`embedId`)
                await interaction.client.users.send(`${userId}`, `<@${userId}> O Staff que assumiu seu ticket em https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id} te Notificou.  `)
                await interaction.reply({  ephemeral: true, content: 'Notificação Enviada com Sucesso!' })
            }
            else if(values == 'staffvoice'){
                const userId = await db.get(`threadowner`)
                
                const voiceThreadChannel = interaction.guild.channels.create({
                    name: `🔊 ${userId}`,
                    type: ChannelType.GuildVoice,
                    parent: '1210320679472205824',
                    permissionOverwrites: [
                        {
                            id: userId,
                            allow: [PermissionsBitField.Flags.ViewChannel]
                        },
                        {
                            id: staffRole,
                            allow: [PermissionsBitField.Flags.ManageChannels]
                        },
                        {
                            id: '959877345253150800',
                            deny: [PermissionsBitField.Flags.ViewChannel]
                        }
                    ]
                }).then(async (voice) => {
        
                    const info = await db.set(`voiceInfos`, voice)

                    const embed = {
                        color: 16777215,
                        description: `Configurações do Canal: <#${voice.id}>`
                    }
    
                    const deleteCallThread = new ButtonBuilder().setCustomId('deletecallthread').setLabel('Deletar Call').setStyle(ButtonStyle.Secondary)
                    const addPermCallThread = new ButtonBuilder().setCustomId('addpermcallthread').setLabel('Adicionar Membro à Call').setStyle(ButtonStyle.Secondary)
                    const removePermCallThread = new ButtonBuilder().setCustomId('removepermcallthread').setLabel('Remover Membro da Call').setStyle(ButtonStyle.Secondary)
    
                    const row = new ActionRowBuilder().addComponents(deleteCallThread, addPermCallThread, removePermCallThread)
    
                    const msg = await interaction.reply({ components: [row], embeds: [embed] })
                })
                

            }
        }

        if(interaction.isButton()){
            if(interaction.customId === 'deletecallthread'){

                if(interaction.member.roles.cache.has(staffRole)) {
                    const voiceInfos = await db.get(`voiceInfos`)
                    const idVoiceInfos = voiceInfos.id

                    const channelVoice = interaction.client.channels.cache.get(`${idVoiceInfos}`);
                    channelVoice.delete()
                    await interaction.reply({ ephemeral: true, content: 'Canal de Voz Deletado com Exitô!'})

                }
                else {
                    await interaction.reply({ ephemeral: true, content: 'Apenas um staff consegue realizar esta ação' });
                }
                
            }
            else if(interaction.customId === 'addpermcallthread'){
                if(interaction.member.roles.cache.has(staffRole)) {
                    const SelectUserPerm = new UserSelectMenuBuilder().setMaxValues(1).setCustomId('useraddperm').setPlaceholder('Selecione o Usuario ou Pesquise: ')
                    const rowSelectUserPerm = new ActionRowBuilder().addComponents(SelectUserPerm)

                    await interaction.reply({ ephemeral: true, components: [rowSelectUserPerm]})
                }
                else {
                    await interaction.reply({ ephemeral: true, content: 'Apenas um staff consegue realizar esta ação' });
                }
            }
            else if(interaction.customId === 'removepermcallthread'){
                if(interaction.member.roles.cache.has(staffRole)) {
                    const SelectUserPermRemove = new UserSelectMenuBuilder().setMaxValues(1).setCustomId('userremoveperm').setPlaceholder('Selecione o Usuario ou Pesquise: ')
                    const rowSelectUserPermRemove = new ActionRowBuilder().addComponents(SelectUserPermRemove)

                    await interaction.reply({ ephemeral: true, components: [rowSelectUserPermRemove]})
                }
                else {
                    await interaction.reply({ ephemeral: true, content: 'Apenas um staff consegue realizar esta ação' });
                }

            }
        }
    }
}