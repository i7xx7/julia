const { Events, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require('discord.js')
const { logsWhitelist } = require('../../myJsonDatabase/myChannels.json')
const { server } = require('../../myJsonDatabase/myEmojis.json')
const { whitelistP, whitelistA } = require('../../myJsonDatabase/myRoles.json')
const { QuickDB } = require("quick.db");
const db = new QuickDB();


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if(interaction.isButton()){

            if(interaction.customId === 'accomplishwhitelist'){

                await db.set(`whitelistAuthor`, `${interaction.user.id}`)
                await db.set(`guildId`, `${interaction.guild}`)

                const whitelistModal = new ModalBuilder().setCustomId('whitelistmodal').setTitle('Perguntas WhiteList - Pagina 1')
                const questionOne = new TextInputBuilder().setCustomId('whitelistquestionone').setLabel("Pergunta 1").setStyle(TextInputStyle.Paragraph).setMaxLength(1_000).setRequired(true);
                const questionTwo = new TextInputBuilder().setCustomId('whitelistquestiontwo').setLabel("Pergunta 2").setStyle(TextInputStyle.Paragraph).setMaxLength(1_000).setRequired(true);
                const questionThree = new TextInputBuilder().setCustomId('whitelistquestionthree').setLabel("Pergunta 3").setStyle(TextInputStyle.Paragraph).setMaxLength(1_000).setRequired(true);
                const questionFour = new TextInputBuilder().setCustomId('whitelistquestionfour').setLabel("Pergunta 4").setStyle(TextInputStyle.Paragraph).setMaxLength(1_000).setRequired(true);
                const questionFive = new TextInputBuilder().setCustomId('whitelistquestionfive').setLabel("Pergunta 5").setStyle(TextInputStyle.Paragraph).setMaxLength(1_000).setRequired(true);
                
                const questionOneRow = new ActionRowBuilder().addComponents(questionOne);
                const questionTwoRow = new ActionRowBuilder().addComponents(questionTwo);
                const questionThreeRow = new ActionRowBuilder().addComponents(questionThree);
                const questionFourRow = new ActionRowBuilder().addComponents(questionFour);
                const questionFiveRow = new ActionRowBuilder().addComponents(questionFive);

                whitelistModal.addComponents(questionOneRow, questionTwoRow, questionThreeRow, questionFourRow, questionFiveRow)
                await interaction.showModal(whitelistModal);
            }

        }

        else if(interaction.isModalSubmit()){
            const questionOne = interaction.fields.getTextInputValue('whitelistquestionone');
            const questionTwo = interaction.fields.getTextInputValue('whitelistquestiontwo');
            const questionThree = interaction.fields.getTextInputValue('whitelistquestionthree');
            const questionFour = interaction.fields.getTextInputValue('whitelistquestionfour');
            const questionFive = interaction.fields.getTextInputValue('whitelistquestionfive');

            await db.set(`qone`, `${questionOne}`)
            await db.set(`qtwo`, `${questionTwo}`)
            await db.set(`qthree`, `${questionThree}`)
            await db.set(`qfour`, `${questionFour}`)
            await db.set(`qfive`, `${questionFive}`)

            await interaction.reply({ content: `Whitelist enviada com exitô! Aguarde em torno de 48 Horas (Depende da Fila de Whitelists) (Personalizavel)`, ephemeral: true })

            const embed = {
                color: 16777215,
                fields: [
                    {
                        name: `Resposta — 1`,
                        value: `${questionOne}`,
                        inline: true
                    },
                    {
                        name: `Resposta — 2`,
                        value: `${questionTwo}`,
                        inline: true
                    },
                    {
                        name: `Resposta — 3`,
                        value: `${questionThree}`,
                        inline: false
                    },
                    {
                        name: `Resposta — 4`,
                        value: `${questionFour}`,
                        inline: true
                    },
                    {
                        name: `Resposta — 5`,
                        value: `${questionFive}`,
                        inline: true
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: `${interaction.guild.name}`,
                    icon_url: `${interaction.guild.iconURL()}`,
                },
                thumbnail: {
                    url: `${interaction.user.displayAvatarURL()}`,
                }
            }
            const whitelistAuthor = await db.get(`whitelistAuthor`)
            const channelWhielist = interaction.client.channels.cache.get(`${logsWhitelist}`);

            const acceptList = new ButtonBuilder().setCustomId('acceptlist').setLabel('Aceitar').setStyle(ButtonStyle.Success)
            const rejectList = new ButtonBuilder().setCustomId('rejectlist').setLabel('Rejeitar').setStyle(ButtonStyle.Danger)
            const deleteList = new ButtonBuilder().setCustomId('deletelist').setLabel('Deletar').setStyle(ButtonStyle.Secondary)
            const row  =  new ActionRowBuilder().addComponents(acceptList, rejectList, deleteList)

            const embedId = channelWhielist.send({ embeds: [embed], content: `Nova Whitelist Realizada - Autor: <@${whitelistAuthor}>`, components: [row] })
            embedId.then(async (msg) => {
                await db.set(`embedIdwhitelist`, `${msg.id}`)
            })
            
        }
        
        if(interaction.isButton()){
            if(interaction.customId === 'acceptlist'){

                const questionOne = await db.get(`qone`)
                const questionTwo = await db.get(`qtwo`)
                const questionThree = await db.get(`qthree`)
                const questionFour = await db.get(`qfour`)
                const questionFive = await db.get(`qfive`)

                const embedId = await db.get(`embedIdwhitelist`)
                const WhiteListChannel = interaction.channel
                const embedMessage = await WhiteListChannel.messages.fetch(embedId).then(async (msg) => {
                    const embed = {
                        color: 16777215,
                        fields: [
                            {
                                name: `Resposta — 1`,
                                value: `${questionOne}`,
                                inline: true
                            },
                            {
                                name: `Resposta — 2`,
                                value: `${questionTwo}`,
                                inline: true
                            },
                            {
                                name: `Resposta — 3`,
                                value: `${questionThree}`,
                                inline: false
                            },
                            {
                                name: `Resposta — 4`,
                                value: `${questionFour}`,
                                inline: true
                            },
                            {
                                name: `Resposta — 5`,
                                value: `${questionFive}`,
                                inline: true
                            }
                        ],
                        timestamp: new Date().toISOString(),
                        footer: {
                            text: `${interaction.guild.name}`,
                            icon_url: `${interaction.guild.iconURL()}`,
                        },
                        thumbnail: {
                            url: `${interaction.user.displayAvatarURL()}`,
                        }
                    }
                    const whitelistAuthor = await db.get(`whitelistAuthor`)
        
                    const acceptedList = new ButtonBuilder().setDisabled(true).setLabel(`Whitelist Aprovada por @${interaction.user.username}`).setStyle(ButtonStyle.Secondary).setCustomId('accepted')
                    const row = new ActionRowBuilder().addComponents(acceptedList)

                    msg.edit({ embeds: [embed], content: `Nova Whitelist Realizada - Autor: <@${whitelistAuthor}>`, components: [row] })
                })
                
                const user = await db.get(`whitelistAuthor`)
                const guild = await db.get(`guildId`)
                await interaction.client.users.send(`${user}`, `<@${user}> Sua Whitelist do servidor ${guild} foi aprovada com exitô! \n Para conectar no servidor fivem utilize \`connect 1111.1111.11111\` `)
                await interaction.reply({ ephemeral: true, content: 'Whitelist Aprovada com exitô!' })

            }
            else if(interaction.customId === 'rejectlist'){

                const embedId = await db.get(`embedIdwhitelist`)
                const questionOne = await db.get(`qone`)
                const questionTwo = await db.get(`qtwo`)
                const questionThree = await db.get(`qthree`)
                const questionFour = await db.get(`qfour`)
                const questionFive = await db.get(`qfive`)

                const WhiteListChannel = interaction.channel
                const embedMessage = await WhiteListChannel.messages.fetch(embedId).then(async (msg) => {
                    const embed = {
                        color: 16777215,
                        fields: [
                            {
                                name: `Resposta — 1`,
                                value: `${questionOne}`,
                                inline: true
                            },
                            {
                                name: `Resposta — 2`,
                                value: `${questionTwo}`,
                                inline: true
                            },
                            {
                                name: `Resposta — 3`,
                                value: `${questionThree}`,
                                inline: false
                            },
                            {
                                name: `Resposta — 4`,
                                value: `${questionFour}`,
                                inline: true
                            },
                            {
                                name: `Resposta — 5`,
                                value: `${questionFive}`,
                                inline: true
                            }
                        ],
                        timestamp: new Date().toISOString(),
                        footer: {
                            text: `${interaction.guild.name}`,
                            icon_url: `${interaction.guild.iconURL()}`,
                        },
                        thumbnail: {
                            url: `${interaction.user.displayAvatarURL()}`,
                        }
                    }
                    const whitelistAuthor = await db.get(`whitelistAuthor`)
                    const channelWhielist = interaction.client.channels.cache.get(`${logsWhitelist}`);
        
                    const rejectedList = new ButtonBuilder().setDisabled(true).setLabel(`Whitelist Reprovada por @${interaction.user.username}`).setStyle(ButtonStyle.Secondary).setCustomId('rejected')
                    const row = new ActionRowBuilder().addComponents(rejectedList)

                    msg.edit({ embeds: [embed], content: `Nova Whitelist Realizada - Autor: <@${whitelistAuthor}>`, components: [row] })
                })

                const user = await db.get(`whitelistAuthor`)
                const guild = await db.get(`guildId`)
                await interaction.client.users.send(`${user}`, `<@${user}> Sua Whitelist do servidor ${guild} foi reprovada infelizmente... \n Aguarde 10 Dias para a realização de uma nova whitelist 👍`)

                
                await interaction.reply({ ephemeral: true, content: 'Whitelist Reprovada com exitô!' })

            }
            else if(interaction.customId === 'deletelist'){

                const embedId = await db.get(`embedIdwhitelist`)
                const WhiteListChannel = interaction.channel
                const embedMessage = await WhiteListChannel.messages.fetch(embedId).then(async (msg) => {
                    msg.delete()
                })

            }
        }
    }
}