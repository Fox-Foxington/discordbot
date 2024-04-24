const { MessageEmbed, Permissions, Client } = require('discord.js');

async function createTicket(message) {
    try {
        // Get the guild
        const guild = message.guild;

        // Create the ticket channel
        const channel = await guild.channels.create('hi', {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: guild.roles.everyone.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL]
                },
                {
                    id: message.author.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                }
            ]
        });

        // Send a welcome message in the ticket channel
        const welcomeEmbed = new MessageEmbed()
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

module.exports = { createTicket };
