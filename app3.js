const {
  Client,
  GatewayIntentBits,
  Permissions,
  EmbedBuilder,
  ChannelType,
  PermissionsBitField,
} = require("discord.js");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const {
  handleGuildMemberAdd,
  handleVerifyCommand,
} = require("./modules/roleManager");
const { tickethandler } = require("./modules/ticketSystem");
const { handleChatCommands } = require("./modules/chatCommands");
const { setupBot } = require("./modules/mainBot");
//const { handleMessageReactionAdd } = require("./modules/messageReact");
const { ticketSys } = require("./modules/ticketSystem");

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
    32767,
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
// Call the ticketHandler function

client.on("guildMemberAdd", (member) => {
  handleGuildMemberAdd(member);
});
// Create a new Discord client

// Define message ID and welcome message variables here
let welcomeMessage; // Declare welcomeMessage variable globally
let ticketCounter = 1;

// Call the ticketSys function and pass the required variables
ticketSys(client,  welcomeMessage);

// Initialize the ticket system
//initializeTicketSystem(client);

// Log in to Discord with your bot's token
client.login(token);
