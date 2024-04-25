
/*


async function initializeTicketSystem(client, guildId, channelId, messageId) {
  try {
    const guild = await client.guilds.fetch(guildId);
    if (!guild) {
      throw new Error(`Guild ${guildId} not found`);
    }

    const channel = guild.channels.cache.get(channelId);
    if (!channel) {
      throw new Error(`Channel ${channelId} not found in guild ${guildId}`);
    }

    const message = await channel.messages.fetch(messageId);
    if (!message) {
      throw new Error(`Message ${messageId} not found in channel ${channelId}`);
    }

    console.log(`Fetched message: ${message.content}`);

    // Listen for message reactions
    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.id === messageId && !user.bot) {
        console.log(
          "Reaction added:",
          reaction.emoji.name,
          "by user:",
          user.tag
        );

        // Check if the reaction is the desired one
        if (reaction.emoji.name === "📩") {
          console.log("Desired reaction detected: 📩");

          // Call the createTicket function to create a ticket
          await createTicket(guild, reaction.message);

          // Comment out or remove the line below to prevent removing the user's reaction
          await reaction.users.remove(user);
          console.log("Reaction processing completed.");
        }
      }
    });
  } catch (error) {
    console.error("Error initializing ticket system:", error);
  }
}

// Initialize ticket counter
let ticketCounter = 1;

// Create the ticket channel
async function createTicket(message) {
  try {
    const guild = message.guild;
    const {
      EmbedBuilder,
      ChannelType,
      PermissionsBitField,
    } = require("discord.js");

    // Generate ticket name with an ascending number
    const ticketName = `Ticket-${ticketCounter++}`;

    // Now ticketCounter will increment with each ticket creation

    // Create the ticket channel
    const channel = await guild.channels.create({
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

    console.log("Ticket channel created:", channel.name);

    // Send a welcome message in the ticket channel
    const welcomeEmbed = new EmbedBuilder()
      .setColor("#7289DA")
      .setTitle("Welcome to Your Ticket!")
      .setDescription(
        "Please describe your issue and our staff will assist you shortly."
      )
      .setTimestamp();

    await channel.send({ embeds: [welcomeEmbed] });

    // Notify the user that the ticket has been created
    await message.author.send(
      `Your ticket has been created in ${channel.name}`
    );
  } catch (error) {
    console.error("Error creating ticket channel:", error);
  }
}
module.exports = { initializeTicketSystem };
*/