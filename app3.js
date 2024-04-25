const { Client, GatewayIntentBits, Permissions, EmbedBuilder, ChannelType, PermissionsBitField } = require("discord.js");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const {
  handleGuildMemberAdd,
  handleVerifyCommand,
} = require("./modules/roleManager");
//const { createTicket, initializeTicketSystem } = require("./modules/ticketSystem");
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
    32767,
  ],
});





client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    try {
        const guildId = '999291586141749359';
        const channelId = '1232920686499201135';
        const messageId = '1232920885212745769';

        const guild = await client.guilds.fetch(guildId);
        const channel = guild.channels.cache.get(channelId);

        if (!channel) {
            console.error(`Channel ${channelId} not found in guild ${guildId}`);
            return;
        }

        const message = await channel.messages.fetch(messageId);

        if (!message) {
            console.error(`Message ${messageId} not found in channel ${channelId}`);
            return;
        }

        console.log(`Fetched message: ${message.content}`);

        // Listen for message reactions
        client.on('messageReactionAdd', async (reaction, user) => {
            console.log('Reaction added:', reaction.emoji.name, 'by user:', user.tag);
            console.log('Message ID:', reaction.message.id); // Log message ID
            console.log('Partial:', reaction.partial); // Log whether the reaction is partial

            // Check if the reaction is on the correct message and by a non-bot user
            if (reaction.message.id === messageId && !user.bot) {
                console.log('Reaction on the correct message and by a non-bot user.');

                // Check if the reaction is the desired one
                if (reaction.emoji.name === '📩') {
                    console.log('Desired reaction detected: 📩');

                    // Call the createTicket function to create a ticket
                    await createTicket(reaction.message);

                    // Comment out or remove the line below to prevent removing the user's reaction
                    await reaction.users.remove(user);
                    console.log('Reaction processing completed.');
                }
            }
        });

    } catch (error) {
        console.error('Error:', error);
    }
});

        // Initialize ticket counter
        let ticketCounter = 1;

        // Create the ticket channel
        async function createTicket(message) {
            try {
                const guild = message.guild;
                const { PermissionsBitField } = require('discord.js');


// Generate ticket name with an ascending number
const ticketName = `Ticket-${ticketCounter++}`;

// Now ticketCounter will increment with each ticket creation

                // Create the ticket channel
                const channel = await guild.channels.create( {
                    name: ticketName,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: guild.id, // Using guild ID here
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: message.author.id,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                    ],
                });
        
                console.log('Ticket channel created:', channel.name);
            
               
        
 

        // Send a welcome message in the ticket channel
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#7289DA')
            .setTitle('Welcome to Your Ticket!')
            .setDescription('Please describe your issue and our staff will assist you shortly.')
            .setTimestamp();

        await channel.send({ embeds: [welcomeEmbed] });

        // Notify the user that the ticket has been created
        await message.author.send(`Your ticket has been created in ${channel.name}`);
    } catch (error) {
        console.error('Error creating ticket channel:', error);
    }
        }





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

  // Initialize the ticket system
  //initializeTicketSystem(client);



// Log in to Discord with your bot's token
client.login(token);
