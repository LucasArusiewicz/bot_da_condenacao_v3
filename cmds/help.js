const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    //var collection = bot.commands;

    let embed = new Discord.RichEmbed()
            .setColor('#' + Math.floor(Math.random()*16777215).toString(16))
            .addField("Esses são os meus comandos!",);

    message.channel.sendEmbed(embed);
}

module.exports.help = {
    name: "help"
}