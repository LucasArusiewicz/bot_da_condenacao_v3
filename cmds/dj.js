const Discord = module.require("discord.js");
const fs = module.require('fs');
const YTDL = module.require("ytdl-core");

module.exports.run = async (bot, message, args) => {

    let servers = {};

    function play(connection, message) {
        var server = servers[message.guild.id];
        
        server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

        server.queue.shift();
        server.dispatcher.on("end", function() {
            if(server.queue[0]){
                play(connection, message);
            }else{
                connection.disconnect();
            }
        });
    }


    if(!args[0]) {
        message.channel.sendMessage("Cade o link do som rapaz?");
        return;
    }
    if(!message.member.voiceChannel) {
        message.channel.sendMessage("Quer que eu toque o som como? Entra em canal de voz aí meu irmão.");
        return;
    }

    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue:[]
    }

    var server = servers[message.guild.id];

    server.queue.push(args[0]);

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
    });

    //Proximo ou Skip
    if (args[0] === "n") {
        var server = servers[message.guild.id];
        if(server.dispatcher) server.dispatcher.end();
    }

    //stop ou pause
    if (args[0 === "p"]) {
        var server = servers[message.guild.id];
        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    }
}

module.exports.help = {
    name: "dj"
}