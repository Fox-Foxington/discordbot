const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const {
  handleGuildMemberAdd,
  handleVerifyCommand,
} = require("./modules/roleManager");
const { createTicket } = require("./modules/ticketsystem");
const { handleChatCommands } = require("./modules/chatCommands");
const { setupBot } = require("./modules/mainBot");

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT;

// Token for your bot
const token = process.env.DISCORD_TOKEN;

// Create a new Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Parse JSON bodies
app.use(bodyParser.json());

// Event handler for when the bot is ready
client.once("ready", () => {
  setupBot(client, {
    name: process.env.CUSTOM_STATUS,
    type: process.env.ACTIVITY_TYPE,
    status: process.env.ONLINE_STATUS,
    customStatus: process.env.CUSTOM_STATUS,
  });
});

// Event handler for incoming messages
client.on("messageCreate", handleChatCommands);

client.on('guildMemberAdd', member => {
    handleGuildMemberAdd(member);
});

// Log in to Discord with your bot's token
client.login(token);
