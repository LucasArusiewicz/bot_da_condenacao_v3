const async = require('asyncawait/async');
const await = require('asyncawait/await');

module.exports.run = async(function(bot, message, args) {
    let msg = await (message.channel.send("Carregando imagem..."));
     await (message.channel.send({files: [
        {
            attachment: message.author.displayAvatarURL,
            name: "avatar.png"
        }
    ]}));
    msg.delete();
});

module.exports.help = {
    name: "avatar"
}
