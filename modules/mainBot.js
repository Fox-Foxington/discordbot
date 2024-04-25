const { ActivityType } = require("discord.js");

module.exports = {
    setupBot: async function(client, botSettings) {
        console.log(`Logged in as ${client.user.tag}`);
        try {
            // Set the bot's status
            await client.user.setStatus(botSettings.status);
            // Set the bot's presence
            const status = await client.user.setPresence({
                activities: [
                    {
                        name: botSettings.name,
                        type: ActivityType[botSettings.type],
                        state: botSettings.customStatus,
                    },
                ],
            });
            console.log("Bot presence set successfully!");
            //console.log(JSON.stringify(status));
        } catch (error) {
            console.error("Error setting bot presence:", error);
        }
    }
};
