const { Events, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if(interaction.isButton()){
            
            if(interaction.customId === 'iniciar') {
            
                const modal = new ModalBuilder()
			    .setCustomId('startmodal')
			    .setTitle('Jogo de Apostas');

                const valueInput = new TextInputBuilder()
			    .setCustomId('valueinput')
			    .setLabel("Qual é o valor da aposta?")
                .setPlaceholder('Minimo: 1,00')
                .setRequired(true)
			    .setStyle(TextInputStyle.Short);

                const firstrow = new ActionRowBuilder().addComponents(valueInput);
                modal.addComponents(firstrow);
                await interaction.showModal(modal);

            } 
            else if(interaction.customId === 'perfil'){
                const dinheiroAtual = await db.get(`din_${interaction.user.id}`) ?? '0'
                const replyProfile = {
                    color: 16777215,
                    description: `Usuario: ${interaction.user}\nSeu saldo atual: R$${dinheiroAtual}`,
                    thumbnail: {
                        url: `${interaction.user.displayAvatarURL({ extension: 'jpg' })}`
                    },
                }
                await interaction.reply({ embeds: [replyProfile], ephemeral: true })
            }
        } 
        else if(interaction.isModalSubmit()){

            if(interaction.customId === 'startmodal'){
                const dinheiroAtual = await db.get(`din_${interaction.user.id}`) ?? '0'
                const value = interaction.fields.getTextInputValue('valueinput');
                
                if(isNaN(value) === false){
                    if(value >= 1) {
                        if(dinheiroAtual > 1) {
                            await interaction.reply({ content: 'simm', ephemeral: true })
                        } else {
                            await interaction.reply({ content: 'Você não possui \`R$R$1,00\`, deposite este ou um valor maior no bot para começar a jogar.', ephemeral: true })
                        }
                    } else {
                        await interaction.reply({ content: 'O valor inserido deve ser maior ou igual à \`R$1,00\`', ephemeral: true })
                    }
                } else {
                    await interaction.reply({ content: 'Você deve inserir um numero', ephemeral: true })
                }
            }

        }
    }
}