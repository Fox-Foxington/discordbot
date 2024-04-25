const {
  Client,
  GatewayIntentBits,
  ActivityType,
  Presence,
} = require("discord.js");
const dotenv = require("dotenv");
const express = require('express');
const bodyParser = require('body-parser');
const client = new Client ({ intents: 32767 });
const { handleGuildMemberAdd, handleVerifyCommand } = require('./modules/roleManager');
const { createTicket } = require('./modules/ticketSystem');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT;


// Token for your bot
const token = process.env.DISCORD_TOKEN;



// Define a global variable to store bot settings
let botSettings = {
  status: process.env.ONLINE_STATUS,
  customStatus: process.env.CUSTOM_STATUS,
};

// Parse JSON bodies
app.use(bodyParser.json());



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



/*
//website link
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


client.on('raw', async packet => {
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;

    // Grab the channel to check the message from
    const channel = client.channels.cache.get(packet.d.channel_id);
    if (!channel) return;

    // Ignore messages not in the guild
    if (channel.type !== 'GUILD_TEXT') return;

    // Fetch the message
    const message = await channel.messages.fetch(packet.d.message_id);
    if (!message) return;

    // Emojis can have identifiers of name:id format, so we have to account for that case as well
    const emoji = packet.d.emoji.id
        ? `${packet.d.emoji.name}:${packet.d.emoji.id}`
        : packet.d.emoji.name;

    // This gives us the reaction we need to emit the event properly, in top of the message object
    const reaction = message.reactions.cache.get(emoji);
    if (!reaction) return;

    // Fetch the user
    const user = client.users.cache.get(packet.d.user_id);
    if (!user) return;

    // Emit the reaction add/remove event
    client.emit(packet.t === 'MESSAGE_REACTION_ADD' ? 'messageReactionAdd' : 'messageReactionRemove', reaction, user);
});




// Listen for message reactions
client.on('messageReactionAdd', async (reaction, user) => {
    console.log('Reaction added:', reaction.emoji.name, 'by user:', user.tag);
    console.log('Message ID:', reaction.message.id); // Log message ID
    console.log('Partial:', reaction.partial); // Log whether the reaction is partial

    // Check if the reaction is on the correct message and by a non-bot user
    if (reaction.message.id === '1232227777634373694' && !user.bot) {
        console.log('Reaction on the correct message and by a non-bot user.');

        // Check if the reaction is the desired one
        if (reaction.emoji.name === '📩') {
            console.log('Desired reaction detected: 📩');
            
            // Call the createTicket function to create a ticket
            await createTicket(reaction.message);
            
            // Comment out or remove the line below to prevent removing the user's reaction
            // await reaction.users.remove(user);
            console.log('Reaction processing completed.');
        }
    }
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



*/


client.on("messageCreate", (message) => {
  console.log(`Message from ${message.author.tag}: ${message.content}`);
});








client.on("messageCreate", (message) => {
  // Check if the message starts with the command prefix ("/ping")
  if (message.content.startsWith("/ping")) {
    // Calculate the bot's latency (ping)
    const latency = Date.now() - message.createdTimestamp;
    // Respond with the bot's latency
    message.channel.send(`Pong! Latency is ${latency}ms.`);
  }
});



// Log in to Discord with your bot's token
client.login(token);

  