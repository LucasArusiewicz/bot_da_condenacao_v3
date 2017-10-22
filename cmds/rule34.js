const Request = module.require('request');
const Cheerio = module.require('cheerio');
const Discord = module.require("discord.js");
const Type = module.require('type-of-is');

module.exports.run = async (bot, message, args) => {
    if (Object.keys(args).length === 0) {
        message.channel.send('Argumentos válidos: toptags, tag');
        return;
    }

    var options = {
        url: 'http://rule34.paheal.net/post/list/1',
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0'
        }
    };

    if (Object.keys(args).length > 0) {
        switch (args[0]) {
            case 'toptags':

                ////////////////////////////////////
                // Inicia Bloco De Comandos TAGS  //
                ////////////////////////////////////

                //Tags
                var tags = [];

                //Cria Embed
                var embed = new Discord.RichEmbed();
                embed.setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
                embed.setTitle("TOPS TAGS");

                //Baixa HTML
                Request(options, function (err, resp, body) {

                    //Se der tudo certo continua
                    if (!err && resp.statusCode == 200) {

                        //Pega corpo do HTML
                        $ = Cheerio.load(body);

                        //Tags Brutas
                        var trs = [];

                        //Pega A dentro das TD dentro das TR dentro dos TBODY dentro das TABLE
                        $('table tbody tr td a', '#Popular_Tagsleft').each(function () {

                            //Pega atributo hreft
                            trs.push($(this).attr('href'));

                            //Pega Texto
                            trs.push($(this).text());

                        });

                        //Percorre Tags Brutas e refina
                        for (i = 0; i < trs.length; i += 4) {
                            tags.push({ titulo: trs[i + 3], url: "http://rule34.paheal.net" + trs[i + 2], wiki: trs[i] });
                        }


                        //Lista TAGS
                        for (i = 0; i < tags.length; i++) {
                            var element = tags[i];
                            embed.addField(`${element.titulo}`, `${element.url}\nInfo: ${element.wiki}`);

                        }

                        message.channel.sendEmbed(embed);

                    } else {
                        throw "Error: " + resp.statusCode;
                    }
                });

                ////////////////////////////////////
                //   Fim Bloco De Comandos TAGS   //
                ////////////////////////////////////

                break;

            case 'teste':

                //Imagem
                //options.url = 'http://rule34.paheal.net/post/view/2345522';
                //webm
                options.url = 'http://rule34.paheal.net/post/view/2341767';
                //GIF
                //options.url = 'http://rule34.paheal.net/post/view/2345416';
                //MP4
                //options.url = 'http://rule34.paheal.net/post/view/2345329'

                //Baixa HTML
                Request(options, function (err, resp, body) {

                    //Se der tudo certo continua
                    if (!err && resp.statusCode == 200) {

                        //Pega corpo do HTML
                        $ = Cheerio.load(body);

                        //Cria Embed
                        var embed = new Discord.RichEmbed();
                        embed.setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
                        embed.setTitle('Teste');

                        let fonte = {
                            arquivo: undefined,
                            tipo: undefined,
                            url: undefined,
                            source: undefined,
                            tit: undefined
                        };

                        ////////////////////////////////////
                        //    Inicio Bloco Pega URL       //
                        ////////////////////////////////////

                        fonte.tit = ('' + $('title').text());
                        embed.setTitle(fonte.tit);

                        $('meta').each(function () {

                            if (Type.is($(this).attr('property'), String)) {
                                if(('' + $(this).attr('property')).substring(3).includes('url')){
                                    fonte.url = '' + $(this).attr('content');
                                }

                                if (('' + $(this).attr('property')).substring(3).includes('image')) {
                                    fonte.source = ('' + $(this).attr('content')).replace('thumb.jpg', '').replace('http://rule34-data-013.paheal.net/_thumbs/', 'http://rule34-data-002.paheal.net/_images/');
                                }
                            }
                        });

                        ////////////////////////////////////
                        //       Fim Bloco Pega URL       //
                        ////////////////////////////////////

                        var opti = {
                            url: fonte.source,
                            method: 'GET',
                            headers: {
                                'User-Agent': 'Mozilla/5.0'
                            }
                        };

                        ////////////////////////////////////
                        //     Inicio Bloco Pega Tipo     //
                        ////////////////////////////////////

                        //Baixa HTML
                        Request(opti, function (err, resp, body) {
                            //Se der tudo certo continua
                            if (!err && resp.statusCode == 200) {

                                fonte.arquivo = body;
                                fonte.tipo = 'jpg';
                            }
                            else {
                                var opti = {
                                    url: fonte.url,
                                    method: 'GET',
                                    headers: {
                                        'User-Agent': 'Mozilla/5.0'
                                    }
                                };
                            Request(opti, function (err, resp, body) {
                                
                                if (!err && resp.statusCode == 200) {

                                    //Pega corpo do HTML
                                    $ = Cheerio.load(body);

                                    $('#Image_Controlsleft').each(function () {
                                        if (($(this).attr('action')).startsWith('http')){
                                            fonte.source = $(this).attr('action');
                                    }
                                    });

                                    console.log(fonte);
                                    

                                }
                            });

                            }

                            switch ((fonte.tipo)) {
                                case 'jpg':
                                    embed.setURL(options.url);
                                    embed.setImage(fonte.source);
                                    break;
                                default:
                                    embed.setTitle(`Formato indisponível (${fonte.tipo})`);
                                    embed.addField(`Link:`, `${fonte.url}`);
                                    break;
                            }
                            message.channel.sendEmbed(embed);
                        });

                        ////////////////////////////////////
                        //      Fim Bloco Pega Tipo       //
                        ////////////////////////////////////

                        ////////////////////////////////////
                        //    Inicio Bloco Pega Arquivo   //
                        ////////////////////////////////////

                        /*console.log(fonte.tipo);
                        console.log(typeof fonte.url);
            
                        switch (('' + fonte.tipo)) {
                            case 1:
                                embed.setImage(fonte.url);
                                break;
                            default:
                                embed.setTitle(`Formato indisponível (${fonte.tipo})`);
                                embed.addField(`Link:`,`${fonte.url}`);
                                break;
                        }*/

                        ////////////////////////////////////
                        //     Fim Bloco Pega Arquivo     //
                        ////////////////////////////////////

                        ////////////////////////////////////
                        //  Inicio Bloco Envia Mensagem   //
                        ////////////////////////////////////




                        //message.channel.sendEmbed(embed);

                        ////////////////////////////////////
                        //    Fim Bloco Envia Mensagem    //
                        ////////////////////////////////////


                    } else {
                        throw "Error: " + resp.statusCode;
                    }
                });
                break;

            case 'tag':
                message.delete().catch(console.error);
                var aux = '' + args[1];

                if (!aux.startsWith('http://rule34.paheal.net/post/view/')) {
                    message.channel.send('Link Inválido!');
                    return;
                }

                options.url = args[1];

                ////////////////////////////////////
                // Inicia Bloco De Comandos TAGS  //
                ////////////////////////////////////

                //Tags
                var tags = [];

                //Baixa HTML
                Request(options, function (err, resp, body) {

                    //Se der tudo certo continua
                    if (!err && resp.statusCode == 200) {

                        //Pega corpo do HTML
                        $ = Cheerio.load(body);

                        //Cria Embed
                        var embed = new Discord.RichEmbed();
                        embed.setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
                        embed.setTitle("TAGS");
                        embed.addField(`Link:`, `${options.url}`)

                        //Tags Brutas
                        var trs = [];

                        //Pega A dentro das TD dentro das TR dentro dos TBODY dentro das TABLE
                        $('table tbody tr td a', '#Tagsleft').each(function () {

                            //Pega atributo hreft
                            trs.push($(this).attr('href'));

                            //Pega Texto
                            trs.push($(this).text());

                        });

                        //Percorre Tags Brutas e refina
                        for (i = 0; i < trs.length; i += 4) {
                            tags.push({ titulo: trs[i + 3], url: "http://rule34.paheal.net" + trs[i + 2], wiki: trs[i] });
                        }

                        for (i = 0; i < tags.length; i++) {
                            var element = tags[i];
                            embed.addField(`${element.titulo}`, `${element.url}\nInfo: ${element.wiki}`);

                        }

                        message.channel.sendEmbed(embed);

                    } else {
                        throw "Error: " + resp.statusCode;
                    }
                });

                ////////////////////////////////////
                //   Fim Bloco De Comandos TAGS   //
                ////////////////////////////////////

                break;
        }
    }
}

module.exports.help = {
    name: "rule34"
}