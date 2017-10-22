const config = require("./config.json");
const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const fs = require("fs");
const prefix = config.prefix;

const bot = new Discord.Client();
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

bot.on("ready", async () => {
  bot.user.setGame("JS")

  console.log(`Condenação iniciada!`);
  console.log(`Total de Canais: ${bot.channels.size}`);
  console.log(`Total de Servidores: ${bot.guilds.size}`);
  console.log(`Total de Usuários: ${bot.users.size}`);
  
  //mostra collection
  //console.log(bot.commands);

});

bot.on("message", async message => {

    if (message.author.equals(bot.user)) return;

    let mensagemArray = message.content.split(" ");
    let comando = mensagemArray[0];
    let args = mensagemArray.slice(1);
    
    if(!comando.startsWith(prefix)) return;

    let cmd = bot.commands.get(comando.slice(prefix.length));
    if(cmd){
        cmd.run(bot, message, args);
    } 
});

bot.login(config.token);