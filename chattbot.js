const tmi = require('tmi.js');

const client = new tmi.Client({
    connection:{
        reconnect:true
    },
    channels: [ process.env.STREAMER_USERNAME ],
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN,
    }
});

client.connect();

client.on('message', (channel, tags, message, self) =>{
    const isNotBot = tags.username.toLocaleLowerCase() !== process.env.BOT_USERNAME;

    if (isNotBot) {
        client.say(channel, `Zpráva "${message}" odeslána ${tags.username}`)
    }

    console.log(`${tags['display-name']}: ${message}`);
});