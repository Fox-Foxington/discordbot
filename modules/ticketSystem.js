


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    try {
        const guildId = '1209262401136889866';
        const channelId = '1211155147850522654';
        const messageId = '1232227777634373694';

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

module.exports = { initializeTicketSystem };
