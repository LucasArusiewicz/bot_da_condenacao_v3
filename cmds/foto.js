const async = require('asyncawait/async');
const await = require('asyncawait/await');
const Request = module.require('request');
const Cheerio = module.require('cheerio');
const Querystring = module.require('querystring');
const Discord = module.require("discord.js");
const Type = module.require('type-of-is');

module.exports.run = async ((bot, message, args) => {
    if (Object.keys(args).length === 0) {
        var embed = new Discord.RichEmbed();
        embed.setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
        embed.setTitle('Comando /foto');
        embed.setDescription('Pesquisa até 100 fotos no Google Imagens');
        embed.addField(`Retorna apenas a primeira foto:`, `/foto [query da pesquisa]`)
        embed.addField(`Retorna o número solicitado de fotos(limite: 100):`, `/foto [número de fotos] [query da pesquisa]`);
        embed.addField(`Observação:`, `Caso a "query de pesquisa" começe com um número e não seja somente um número, será necessário expecificar o "número de fotos" que irá retornar. Caso contrário não haverá precisão nos resultados. Por padrão ele retornará apenás uma foto caso forneça um valor fora do intervalo [1-100].`);
        message.channel.sendEmbed(embed);
        return;
    } else if (Object.keys(args).length > 0) {
        let indice = 0;
        let numDeFotos = 1;
        let numDeFotosEnviadas = 0;
        
        if ((Type.is(parseInt(args[0]), Number) && (parseInt(args[0]) > 0 && parseInt(args[0]) <= 100)) && Object.keys(args).length > 1) {
            indice = 1;
            numDeFotos = args[0];
        }
        
        let link = 'https://www.google.com.br/search?q='
        var argsPesquisa = '';
        for (i = indice; i < Object.keys(args).length; i++) {
            argsPesquisa += args[i] + ' ';
        }
        argsPesquisa = argsPesquisa.substring(0, (argsPesquisa.length - 1))
        var pesquisa = Querystring.stringify({ query: argsPesquisa });
        link += ('' + pesquisa).substring(6);
        link += '&source=lnms&tbm=isch';

        var opti = {
            url: link,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
            }
        };

        Request(opti, function (err, resp, body) {
            if (!err && resp.statusCode == 200) {
                $ = Cheerio.load(body);
                var texto = '' + $('body').text();
                texto = texto.substring(texto.search('Resultados da pesquisa ') + 'Resultados da pesquisa '.length);

                var urls = [];
                while (texto.length > 10) {
                    var informacoes = {
                        titulo: undefined,
                        info: undefined,
                        conteudo: undefined,
                        fonte: undefined,
                        imagem: undefined
                    }
                    informacoes.info = texto.substring(0, texto.search('{'));
                    texto = texto.substring(informacoes.info.length);
                    informacoes.conteudo = texto.substring(0, texto.search('}') + 1);
                    texto = texto.substring(informacoes.conteudo.length);
                    urls.push(informacoes);
                }
                urls.forEach(function (element) {
                    if (numDeFotosEnviadas < numDeFotos) {
                        var s = element.conteudo.toString();
                        s = s.replace(/\\n/g, "\\n")
                                .replace(/\\'/g, "\\'")
                                .replace(/\\"/g, '\\"')
                                .replace(/\\&/g, "\\&")
                                .replace(/\\r/g, "\\r")
                                .replace(/\\t/g, "\\t")
                                .replace(/\\b/g, "\\b")
                                .replace(/\\f/g, "\\f");
                        element.titulo = '' + (JSON.parse(s)).pt;
                        element.imagem = '' + (JSON.parse(s)).ou;
                        element.fonte = '' + (JSON.parse(s)).ru;
                        
                        var embed = new Discord.RichEmbed();
                        embed.setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
                        embed.setTitle(element.titulo);
                        embed.setURL(element.fonte)
                        embed.setImage(element.imagem);
                        embed.addField(`Info:`, `${element.info}`);
                        message.channel.sendEmbed(embed);
                        numDeFotosEnviadas++;
                    } else {
                        return;
                    }
                }, this);
            } else {
                throw "Error: " + resp.statusCode;
            }
        });
    }
});

module.exports.help = {
    name: "foto"
}
