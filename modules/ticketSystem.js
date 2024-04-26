// Import necessary Discord.js modules
const { PermissionsBitField, ChannelType, EmbedBuilder } = require("discord.js");

// Define the ticketSys function
async function ticketSys(client, messageId, welcomeMessage) {
  // Define the hasRole function
  function hasRole(member, roleName) {
    // Find the role by name
    const role = member.guild.roles.cache.find(
      (role) => role.name === roleName
    );
    // If the role exists and the user has it, return true
    return role && member.roles.cache.has(role.id);
  }

  // Listen for message reactions
  client.on("messageReactionAdd", async (reaction, user) => {
    console.log("Reaction added:", reaction.emoji.name, "by user:", user.tag);
    console.log("Message ID:", reaction.message.id); // Log message ID
    console.log("Partial:", reaction.partial); // Log whether the reaction is partial

    // Get the GuildMember object corresponding to the reacting user
    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);

    // Check if the reaction is on the correct message and by a non-bot user
    if (reaction.message.id === messageId && !user.bot) {
      console.log("Reaction on the correct message and by a non-bot user.");

      // Check if the reaction is the desired one
      if (reaction.emoji.name === "📩") {
        console.log("Desired reaction detected: 📩");

        // Call the createTicket function to create a ticket
        await createTicket(reaction.message, user);

        // Comment out or remove the line below to prevent removing the user's reaction
        await reaction.users.remove(user);
        console.log("Reaction processing completed.");
      }
    }

    // Check if the reaction is added to the welcome message in a ticket channel
    if (
      reaction.message.id === welcomeMessage.id &&
      reaction.message.channel.name.startsWith("ticket-")
    ) {
      // Check if the reacting user is an admin
      const isAdmin = hasRole(member, "Admin"); // Replace 'Administrator' with the actual role name

      // Check if the reaction is the ❌ emoji
      if (reaction.emoji.name === "❌" && isAdmin) {
        try {
          // Delete the ticket channel
          await reaction.message.channel.delete();
          console.log(
            `Ticket channel ${reaction.message.channel.name} deleted by admin ${user.tag}`
          );
        } catch (error) {
          console.error("Error deleting ticket channel:", error.message);
        }
      }
    }
  });

  // Define the ticketHandler function
  async function ticketHandler() {
    console.log(`Logged in as ${client.user.tag}`);

    try {
      // Fetch guild, channel, and message
      const guildId = "999291586141749359";
      const channelId = "1232920686499201135";
      const messageId = "1232920885212745769";
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

      // Your ticketHandler logic goes here...

    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Initialize ticket counter
  let ticketCounter = 1;

  // Create the ticket channel
  async function createTicket(message, reactingUser) {
    try {
      const guild = message.guild;

      // Generate ticket name with an ascending number
      const ticketName = `ticket-${ticketCounter++}`;

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
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
          {
            id: reactingUser.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
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

      welcomeMessage = await channel.send({ embeds: [welcomeEmbed] });

      // React to the message with a close emoji
      await welcomeMessage.react("❌");

      // Notify the user that the ticket has been created
      const user = reactingUser;
      await user.send(
        `Your ticket has been created in ${channel}. Please describe your issue there.`
      );

      console.log(`Ticket created for ${user.tag}`);
    } catch (error) {
      console.error("Error creating ticket channel:", error);
    }
  }
}

// Export the ticketSys function
module.exports = {
  ticketSys
};
