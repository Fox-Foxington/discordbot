const { MessageEmbed, EmbedBuilder } = require("discord.js");


module.exports = {
    sendCommandListEmbed: function(message) {
        // Create a new embed message
        const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Command List")
        .setDescription("List of available commands:")
        .addFields(
            { name: "!commands", value: "List of all bot commands." },
            { name: "!ping", value: "Check bot's latency." },
            { name: "!say [message]", value: "Make the bot say something." }
        );

    // Send the embed message to the channel where the command was typed
    message.channel.send({ embeds: [embed] });
}
};