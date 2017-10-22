module.exports.run = async (bot, message, args) => {

    if(Object.keys(args).length === 0){
        message.channel.send("!hentai");
    } else {
        for(i = 0; i < args; i++){
            message.channel.send("!hentai");
        }
    }
}

module.exports.help = {
    name: "bug"
}