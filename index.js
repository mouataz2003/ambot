const Discord = require('discord.js');
const music = require('discord.js-music-v11');
const bot = new Discord.Client();
const { prefix } = require('./config.json')

bot.on('ready', () => {
    console.log(`[Start] ${new Date()}`);
});


bot.on('message', message => {


    if (message.content === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL}`;
        });
        message.channel.send(avatarList)
    }

    if (message.content === 'help') {
        message.channel.send(" go check your Direct Message 😄")
        message.author.createDM().then(channel => {
            return channel.send({
                embed: {
                    color: 0xff0000,
                    fields: [{
                        name: "All Commands  :",
                        value:
                            "`1.` -help\n`2.` -avatar \n`3.` -ping \n`4.` -server \n`5.` -me \n`6.` -play\n`7.` -skip \n`8.` -pause \n`9.` -queue \n`10.` -resume \n`11.` -volume\n`12.` -leave \n`13.` -clearqueue "
                    
                    }]
                }
            })
        }).catch(console.error)
        message.react('😄')
    }

    if (message.content === 'ping') {
        let startTime = Date.now();
        var embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .addField("Ping local:", `**:heartbeat: Ping = ${Math.round(Date.now() - startTime)} ms**`, true)
            .addField("API:", `**:stopwatch: Ping = ${Math.round(bot.ping).toFixed(0)} ms**`, true)
            .setFooter("Requête envoyé par " + message.author.username, message.author.avatarURL)

        message.channel.send('*Calcul du ping...*').then(m => m.edit(embed))
    }

    if (message.content === 'server'){
        message.channel.send(`Name : \n ${message.guild.name}\n\nMembers: \n ${message.guild.memberCount}`)
    }

    if (message.content === 'me') {
        message.channel.send(`Ton nom : ${message.author.username}`)
    }





})

bot.login('NDUzMzI5MjYwODc5NTQ0MzIx.DfdTSg._MxlsUWKjHoflK9L4RMeg6aqIDU');
