// Import the commandList module
const { sendCommandListEmbed } = require("./commandList");
const { handleVerifyCommand } = require("./roleManager");


module.exports = {
    handleChatCommands: async function(message) {
        // Check if the message starts with the command prefix ("/ping")
        if (message.content.startsWith("!ping")) {
            // Calculate the bot's latency (ping)
            const latency = Date.now() - message.createdTimestamp;
            // Respond with the bot's latency
            message.channel.send(`Pong! Latency is ${latency}ms.`);
        }

        // Check if the message starts with the command prefix ("/say")
        else if (message.content.startsWith("!say")) {
            // Extract the message content after the command
            const content = message.content.slice("!say".length).trim();
            // Check if there is any content after the command
            if (content) {
                // Send the extracted content to the same channel where the command was used
                await message.channel.send(content);
                // Delete the original message
                await message.delete();
            } else {
                // If no message is provided, send a reply indicating the usage of the command
                message.channel.send("Please provide a message after the command.");
            }
        }

        // Check if the message starts with the command prefix ("/commands")
        else if (message.content.startsWith("!commands")) {
            // Call the sendCommandListEmbed function to send the command list
            sendCommandListEmbed(message);
        }

        else if (message.content.startsWith('!verify')) {
            const args = message.content.slice(1).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            console.log('Command:', command); // Add this line for debugging
            const mentionOrId = args[0];
            handleVerifyCommand(message, 'Admin', mentionOrId);
        }
    }
};


