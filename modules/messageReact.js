const { hasRole } = require('./roleUtils');

async function handleMessageReactionAdd(reaction, user) {

// Listen for message reactions

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
}

module.exports = {
    handleMessageReactionAdd
};