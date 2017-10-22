
module.exports.run = async (bot, message, args) => {

    if(Object.keys(args).length === 0){
        print(message);
    } else {
        for(i = 0; i < args; i++){
            print(message);
        }
    }

}

function print(message){

    let semlink = true;
    while (semlink) {

        let texto = "https://prnt.sc/";
        let alfa = "abcdefghijklmnopqrstuvwxyz";

        let char = Math.floor((Math.random() * 4) + 1);
        for(i = 0;i < char; i++){
            texto += alfa.charAt(Math.floor(Math.random() * alfa.length));
        }

        char = Math.floor((Math.random() * 4) + 1);
        for(i = 0;i < char; i++){
            texto += Math.floor((Math.random() * 10));
        }


        semlink = false;
    }
    
    message.channel.send(pegaString(texto));
}

function pegaString(url){

    let urls = new URL(url);
    
    return urls;
}

module.exports.help = {
    name: "print"
}