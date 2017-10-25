//Constantes
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const config = require("./config.json");
const Discord = require('discord.js');
const fs = require('fs');
const prefix = config.prefix;
const bot = new Discord.Client();

//Carrega comandos da pasta cmds
bot.commands = new Discord.Collection();
fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("Sem comandos!");
        return;
    }
    console.log(`Carregando ${jsfiles.length} comandos!`);

    jsfiles.forEach((f,i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} carregado!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on('ready', async(function() {
  
  //Seta o que esta jogando.
  bot.user.setGame("On na Azura para sempre!");
  
  console.log(`Condenação iniciada!`);
  console.log(`Total de Canais: ${bot.channels.size}`);
  console.log(`Total de Servidores: ${bot.guilds.size}`);
  console.log(`Total de Usuários: ${bot.users.size}`);

}));

bot.on('message', async(function(message){

    if (message.author.equals(bot.user)) return;

    let mensagemArray = message.content.split(" ");
    let comando = mensagemArray[0];
    let args = mensagemArray.slice(1);
    
    if(!comando.startsWith(prefix)) return;

    let cmd = bot.commands.get(comando.slice(prefix.length));
    if(cmd){
        cmd.run(bot, message, args);
    } 
}));

bot.login(config.token);
