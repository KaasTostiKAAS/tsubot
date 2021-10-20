const { MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const logo = "https://i.imgur.com/XmlhMCQ.png";

module.exports = {
    name: "say",
    run: async (client, message, args) => {
        const roleColor =
            message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;

        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send("Nee, mag je niet doei.");

        message.delete;
        const sayEmbed = new MessageEmbed()
            .setDescription(args.join(" "))
            .setTimestamp()
            .setColor(roleColor)
            .setFooter("Tactical Security Unit", logo);

        message.channel.send(sayEmbed);
    },
};
