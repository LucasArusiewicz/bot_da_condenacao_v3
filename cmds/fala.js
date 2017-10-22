module.exports.run = async (bot, message, args) => {

    message.delete().catch(console.error);
    if(Object.keys(args).length === 0){
        return;
    } else if (Object.keys(args).length === 1 || isNaN(args[1])){
        texto = "";
        for(i = 0; i < Object.keys(args).length; i++){
            texto += args[i] + " ";
        }
        message.channel.send(texto, {tts: true});
    } else if (Object.keys(args).length === 2 && !isNaN(args[1])){
        for(i = 0; i < args[1]; i++){
            message.channel.send(args[0], {tts: true});
        }
    }
}

module.exports.help = {
    name: "fala"
}