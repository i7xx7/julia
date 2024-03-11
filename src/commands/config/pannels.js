const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, InteractionCollector } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('saypannel')
		.setDescription('sends selected pannel')
        .addStringOption(option =>
            option.setName('value')
                .setDescription('select a pannel')
                .setRequired(true)),
	async execute(interaction) {

        const code = interaction.options.getString('code')

        async function pannelSuporte() {
            const pannel1 = {
                color: 16777215,
                title: `SUPORTE`,
                description: "> Caso queira abrir um ticket, esteja ciente que o assunto abordado no mesmo deve ser relacionado pagamentos, problemas na utilização do painel ou denunciar um membro no servidor com provas precisas.",

            }

            await interaction.reply({
                embeds: [pannel1]
            })
        }

        async function pannelAdq() {
            const pannel2 = {
                color: 16777215,
                title: `PAINEL PLAYBOY`,
                description: `> Nosso painel contém atualmente funcionalidades como: Tracker (obter infos do user), clear dm, mass DM'S, mass DM, clone server, nuker, mass msg & mass embed.
                - Você pode adquirir o painel mensalmente por R$9,50 ou anualmente por R$90
                - Antes de realizar a comprar do painel recomendamos que leia os <#1212185129565298769> para que não ocorra nenhum mal entendido`
            }

            await interaction.reply({
                embeds: [pannel2]
            })
        }

        if(code == '1'){
            pannelSuporte()
        }
        else if(code == '2') {
            pannelAdq()
        }
    }
}