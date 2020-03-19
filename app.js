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
    let asleepUser;
    for (let i = 0; i < sleepers.length; i++) {
        if (sleepers[i][msg.author.id]){
            authorIsSleeping = true;
            asleepUser = sleepers[i]
            sleepers.splice(i, 1);
        }
    }

    
    if (authorIsSleeping) {
        const currDate = new Date();
        msg.reply(`<@!${msg.author.id}> woke up from their long slumber. This user has been sleeping for ${currDate - Object.values(asleepUser)[0]} milliseconds `);

    } else if (msg.content.startsWith('sleep')) {
        const user = msg.mentions.users.first()
        //if user exists...
        if (!!user) {
            let userIsSleeping = false;
            for (let i = 0; i < sleepers.length; i++) {
                if (sleepers[i][user.id])
                    userIsSleeping = true;
            }
            if (userIsSleeping) {
                msg.reply(`User: <@!${user.id}> has already been marked as sleeping`)
            } else {
                //pushes an object to sleepers Arr in this format
                // {userid: dateObj}
                sleepers.push({
                    [user.id.toString()]: new Date(),
                })
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