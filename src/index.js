const { 
	Client, Collection, GatewayIntentBits, 
	Partials, Events, ActionRowBuilder, StringSelectMenuBuilder, 
	StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle
} = require('discord.js');
const { painelVendas } = require('./myJsonDatabase/myChannels.json')
const path = require('node:path');
const  fs  = require('node:fs');
require('dotenv').config()
require('./events/client/clientRegis')
require('./database/indexdb')

const client = new Client({ 
	intents: [
	GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
	],
	partials: [
		Partials.Channel,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.Message,
		Partials.Reaction,
		Partials.ThreadMember,
		Partials.User
	]

});

// Handling Commands
client.cooldowns = new Collection();
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[AVISO] O comando: ${filePath} esta sem a propriedade "data" ou "execute".`);
		}
	}
}

// Handling de Events
const foldersEventsPath = path.join(__dirname, 'events')
const eventsFolders =  fs.readdirSync(foldersEventsPath)

for (const folder of eventsFolders) {
	const eventsPath = path.join(foldersEventsPath, folder);
	const eventsFoldersFile = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
	for (const file of eventsFoldersFile) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}

// Commmand Pannel Payments
client.on("messageCreate", async (interaction) => {
    if(interaction.content === '.painelvendas'){
		const embed = {
            color: 16777215,
            title: 'Realizar a Compra do Painel',
            description: '> Veja nossos planos e realize a compra semi-auto'
        }

        const select = new StringSelectMenuBuilder()
			.setCustomId('pay')
			.setPlaceholder('Selecione o Plano ⭣ ')
			.setMaxValues(1)
			.setMinValues(1)
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Plano Gold')
					.setDescription('R$35.99 Por Mês.')
				    .setValue('gold'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Plano Classic')
					.setDescription('R$15.99 Por Mês.')
					.setValue('classic'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Plano Basic')
					.setDescription('R$10.99 Por Mês.')
					.setValue('basic')
			);

        const row = new ActionRowBuilder().addComponents(select)
        
		await interaction.channel.send({ embeds: [embed], components: [row] });
		interaction.delete()
	}
})

// Commmand Painel Mines
client.on("messageCreate", async (interaction) => {
	if(interaction.content === '.painelmines'){

		const user = interaction.user
		const owner = await interaction.guild.fetchOwner()

		if(interaction.author.id !== owner.id){
			await interaction.reply({ content: `${user}, você não possui permissão para realizar esta ação`, ephemeral: true })
		} else {
			const reply = {
				color: 16777215,
				title: '💣 Mines 💎',
				description: '- Verifique sempre os termos e condições para garantir uma experiência tranquila\n- Jogar com responsabilidade é fundamental para uma experiência positiva.'
			}

			const iniciar = new ButtonBuilder()
			.setCustomId('iniciar')
			.setLabel('Jogar')
			.setStyle(ButtonStyle.Secondary);

			const perfil = new ButtonBuilder()
			.setCustomId('perfil')
			.setLabel('Perfil')
			.setStyle(ButtonStyle.Secondary);

			const depositar = new ButtonBuilder()
			.setCustomId('dep')
			.setLabel('Depositar')
			.setStyle(ButtonStyle.Success);

			const sacar = new ButtonBuilder()
			.setCustomId('sac')
			.setLabel('Sacar')
			.setStyle(ButtonStyle.Danger);

			const row = new ActionRowBuilder().addComponents(iniciar, perfil, depositar, sacar);

			await interaction.channel.send({ embeds: [reply], components: [row] })
			await interaction.delete()
			
		}

	}
})



// Login
client.login(process.env.TOKEN)
process.on("uncaughtException", console.error)
process.on("unhandledRejection", console.error)