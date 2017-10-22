const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
            .setColor('#' + Math.floor(Math.random()*16777215).toString(16))
            .addField("Total de Canais:", bot.channels.size)
            .addField("Total de Servidores:", bot.guilds.size)
            .addField("Total de Usuários:", bot.users.size);

        message.channel.sendEmbed(embed);

        return;
}

module.exports.help = {
    name: "status"
}