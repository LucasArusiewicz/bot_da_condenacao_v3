
module.exports.run = async (bot, message, args) => {

    var ar = "" + args[0];

    if(Object.keys(args).length === 0 && !ar.startsWith("http")){
        message.channel.send("Argumentos válidos: article, title, code, dom, lib");
        return;
    } else if (Object.keys(args).length === 2){
        
        console.log(args);
    }
}

module.exports.help = {
    name: "html"
}