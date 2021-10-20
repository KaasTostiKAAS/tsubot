const { Collection, Client, Discord } = require("discord.js");
const fs = require("fs");
const client = new Client({
    disableEveryone: true,
});
const config = require("./config.json");
const prefix = config.prefix;
const token = config.token;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});
client.on("ready", () => {
    client.user.setActivity("TSU", { type: "WATCHING" });
    console.log(`${client.user.username} ✅`);
});
client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.member)
        message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
});

client.on("guildMemberAdd", async (member) => {
    const Channel = member.guild.channels.cache.get("898854525711056896");
    Channel.send(
        `Welkom **<@${member.id}>**. \nAls je geen Tim heet, of geen medewerker ben van TSU leave dan, voordat we je bannen :)`
    );
});
client.login(process.env.token);
