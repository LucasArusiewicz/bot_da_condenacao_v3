const async = require('asyncawait/async');
const await = require('asyncawait/await');
const Discord = module.require("discord.js");

module.exports.run = async((bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("Essas são as suas informações!")
        .setColor('#' + Math.floor(Math.random() * 16777215).toString(16))
        .setThumbnail(message.author.avatarURL)
        .addField("Username", `${message.author.username}#${message.author.discriminator}`)
        .addField("ID", `${message.author.id}`)
        .addField("Criado em", `${message.author.createdAt}`);

    message.channel.sendEmbed(embed);
});

module.exports.help = {
    name: "perfil"
}
