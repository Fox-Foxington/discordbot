const {
  Client,
  GatewayIntentBits,
  ActivityType,
  Presence,
} = require("discord.js");
const dotenv = require("dotenv");
const express = require('express');
const bodyParser = require('body-parser');
const { handleGuildMemberAdd, handleVerifyCommand } = require('./modules/roleManager');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT;



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



// Define a global variable to store bot settings
let botSettings = {
  status: process.env.ONLINE_STATUS,
  customStatus: process.env.CUSTOM_STATUS,
};

// Parse JSON bodies
app.use(bodyParser.json());

// Define route to receive messages
app.post('/receive-message', (req, res) => {
    const { message } = req.body;
    console.log('Received message from web application:', message);

    // Send the received message to Discord
    sendToDiscord(message)
        .then(() => {
            console.log('Message sent to Discord successfully');
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error sending message to Discord:', error);
            res.status(500).send('Internal Server Error');
        });
});

client.on('guildMemberAdd', member => {
    handleGuildMemberAdd(member);
});

client.on('messageCreate', message => {
  
    console.log(`Message: ${message.content}`);
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    console.log('Command:', command); // Add this line for debugging

    const mentionOrId = args[0];
    handleVerifyCommand(message, 'Fox', mentionOrId);
    
});

// Function to send message to Discord
async function sendToDiscord(message) {
    try {
        const channel = await client.channels.fetch(process.env.CHANNELID);
        if (channel) {
            await channel.send(message);
            console.log('Message sent to Discord');
        } else {
            console.error('Unable to find Discord channel');
        }
    } catch (error) {
        console.error('Error sending message to Discord:', error);
    }
}


// Event handler for when the bot is ready
client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  try {
     // Set the bot's status
     await client.user.setStatus(botSettings.status);
    // Set the bot's presence
    const status = await client.user.setPresence({
    
    
      activities: [
        {
          name: "customname",
          type: ActivityType.Custom,
          state: botSettings.customStatus,
        },
      ],
    });
    console.log("Bot presence set successfully!");
    //console.log(JSON.stringify(status));
  } catch (error) {
    console.error("Error setting bot presence:", error);
  }
});


// Event listener for incoming messages
client.on("messageCreate", (message) => {
  // Check if the message starts with the command prefix ("/say")
  if (message.content.startsWith("/say")) {
    // Extract the message content after the command
    const content = message.content.slice("/say".length).trim();

    console.log("Content:", content); // Log the extracted content

    // Send the extracted content to the same channel where the command was used
    message.channel.send(content);
  }
});

client.on("messageCreate", (message) => {
  // Check if the message starts with the command prefix ("/ping")
  if (message.content === "/ping") {
    // Calculate the bot's latency (ping)
    const latency = Date.now() - message.createdTimestamp;
    // Respond with the bot's latency
    message.channel.send(`Pong! Latency is ${latency}ms.`);
  }
});



// Log in to Discord with your bot's token
client.login(token);


app.listen(port, () => {
    console.log(`Main app is running on port ${port}`);
  });
  