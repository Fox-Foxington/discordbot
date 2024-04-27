require('dotenv').config();
const {Client, IntentsBitField, Partials} = require('discord.js');
const { MessageReactionAdd } = require('./modules/reactionHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
    ],
    partials: [
        Partials.Message,
        Partials.Channel, 
        Partials.Reaction,
    ],

});

client.on('ready', (c) => {
    console.log(`${c.user.tag} I'm Ready`);
})

client.on('messageCreate', (message) => {
    console.log(message.content);
});

client.on('messageReactionAdd', MessageReactionAdd);

client.login(
    process.env.DISCORD_TOKEN
);


//const app = express();
//nofconst port = process.env.PORT;