module.exports.run = async (bot, message, args) => {
    if(Object.keys(args).length === 0){
        return;
    } else if (Object.keys(args).length === 1){

        let texto = "https://teemo.gg/player/resume/br/" + args[0]

    }
}

module.exports.help = {
    name: "elo"
}