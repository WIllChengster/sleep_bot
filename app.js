const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Discord = require('discord.js');
const client = new Discord.Client();
const secret = require('./secret.js')


const sleepers = []

client.on('ready', () => {
    console.log('sleep bot is ready')
})

client.on('message', msg => {
    let authorIsSleeping = false
    //
    //if author of msg was already sleeping, unmark --> send msg that "bro woke up"
    //
    for (let i = 0; i < sleepers.length; i++) {
        if (sleepers[i] === msg.author.id){
            authorIsSleeping = true;
            sleepers.splice(i, 1);
        }
    }

    
    if (authorIsSleeping) {

        msg.reply(`<@!${msg.author.id}> woke up from their long slumber`);


    } else if (msg.content.startsWith('sleep')) {
        const user = msg.mentions.users.first()
        //if user exists...
        if (!!user) {

            let userIsSleeping = false;
            for (let i = 0; i < sleepers.length; i++) {
                if (sleepers[i] === user.id)
                    userIsSleeping = true;
            }
            if (userIsSleeping) {
                msg.reply(`User: <@!${user.id}> has already been marked as sleeping`)
            } else {
                sleepers.push(user.id.toString())
                msg.reply(`User: <@!${user.id}> is now marked as sleeping`);
            }

        } else {
            msg.reply('user does not exist')
        }
    }
});

client.login(secret.bot_token);

app.listen(PORT, () => {
    console.log('PORT IS LISTENING TO:', PORT);
})