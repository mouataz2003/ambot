const Discord = require('discord.js');
const music = require('discord.js-music-v11');
const bot = new Discord.Client();
const { prefix, token } = require('./config.json')

bot.on('ready', () => {
    console.log(`[Start] ${new Date()}`);
});

music(bot, {
    prefix: '-',       // Prefix of '-'.
    global: false,     // Server-specific queues.
    maxQueueSize: 10,  // Maximum queue size of 10.
    clearInvoker: true, // If permissions applicable, allow the bot to delete the messages that invoke it (start with prefix)
    channel: 'music'   // Name of voice channel to join. If omitted, will instead join user's voice channel.
});


bot.on('message', message => {


    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(' ')
    const command = args.shift().toLowerCase();

    if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL}`;
        });
        message.channel.send(avatarList)
    }

    if (command === 'help') {
        message.channel.send(" go check your Direct Message ??")
        message.author.createDM().then(channel => {
            return channel.send({
                embed: {
                    color: 0xff0000,
                    fields: [{
                        name: "Normal Commands : ",
                        value:
                            "`1.` -help\n`2.` -avatar \n`3.` -ping \n`4.` -server \n`5.` -me ",
                        name: "Music Commands  :",
                        value:
                            "`1.` -play\n`2.` -skip \n`3.` -pause \n`4.` -queue \n`5.` -resume \n`6.` -volume\n`7.` -leave \n`8.` -clearqueue "
                    }]
                }
            })
        }).catch(console.error)
        message.react('??')
    }

    if (command === 'ping') {
        let startTime = Date.now();
        var embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .addField("Ping local:", `**:heartbeat: Ping = ${Math.round(Date.now() - startTime)} ms**`, true)
            .addField("API:", `**:stopwatch: Ping = ${Math.round(bot.ping).toFixed(0)} ms**`, true)
            .setFooter("Requête envoyé par " + message.author.username, message.author.avatarURL)

        message.channel.send('*Calcul du ping...*').then(m => m.edit(embed))
    }

    if (command === 'server'){
        message.channel.send(`Name : \n ${message.guild.name}\n\nMembers: \n ${message.guild.memberCount}`)
    }

    if (command === 'me') {
        message.channel.send(`Ton nom : ${message.author.username}`)
    }

    if (command === 'invite-me') {
        message.channel.send(` Invite : \n `+ message.guild.getInvite() )
    }




})

bot.login(token);