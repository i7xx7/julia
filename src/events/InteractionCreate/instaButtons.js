const { Events, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

        if(interaction.isButton()){

            if(interaction.customId === 'curtir'){
                
            }
            else if(interaction.customId === 'comentar'){

            }
            else if(interaction.customId === 'vercurtidas'){

            }
            else if(interaction.customId === 'vercomen'){

            }
            else if(interaction.customId === 'excluirpost'){

            }

        }
    }
}