const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

// Token for your bot
const token = process.env.DISCORD_TOKEN;

// Event listener for when the bot is ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
  });

// Event listener for incoming messages
client.on('messageCreate', message => {
    // Check if the message starts with the command prefix ("/say")
    if (message.content.startsWith('/say')) {
        // Extract the message content after the command
        const content = message.content.slice('/say'.length).trim();

        console.log('Content:', content); // Log the extracted content

        // Send the extracted content to the same channel where the command was used
        message.channel.send(content);
    }
});

client.on('messageCreate', message => {
    // Check if the message starts with the command prefix ("/ping")
    if (message.content === '/ping') {
        // Calculate the bot's latency (ping)
        const latency = Date.now() - message.createdTimestamp;
        // Respond with the bot's latency
        message.channel.send(`Pong! Latency is ${latency}ms.`);
    }
});

client.on('messageCreate', message => {
    console.log('Message:', message.content);
});

// Log in to Discord with your bot's token
client.login(token);
