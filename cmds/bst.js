const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    switch (args[0]) {
        case 'online':
            bot.user.setStatus("online");
            console.log("Status: Online");
            break;
        case 'idle':
            bot.user.setStatus("idle");
            console.log("Status: Idle");
            break;
        case 'invisible':
            bot.user.setStatus("invisible");
            console.log("Status: Invisible");
            break;
        case 'dnd':
            bot.user.setStatus("dnd");
            console.log("Status: dnd");
            break;
    
        default:
        message.channel.send("Argumento inválido. \"online\",\"idle\",\"invisible\"\"dnd\", ");
            break;
    }
}

module.exports.help = {
    name: "bst"
}