const { Client, GatewayIntentBits } = require("discord.js");
// const { joinVoiceChannel, createAudioResource, createAudioPlayer, NoSubscriberBehavior, AudioPlayerStatus } = require("@discordjs/voice");
const spch = require("discord-speech-recognition");
const env = require("dotenv").config().parsed;
const fs = require("fs");
const ascii = require("ascii-table");
const table = new ascii("Eventy");
// const {tts,checkTime,toNormalForm} = require('./utils.js');
const { Player } = require("discord-player");

const client = new Client({
    intents: [
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
});

const player = new Player(client, {
    leaveOnEmpty: true,
});

client.player = player


spch.addSpeechEvent(client,{lang: "pl-PL",minimalVoiceMessageDuration:0});

console.log(`
.----------.
| Delamain |
'----------'
`);

var events = fs.readdirSync('./events').filter( f => f.endsWith('.js'));
for(let i = 0; i < events.length; i++) {
    try {
        var event = require('./events/' + events[i]);
        var eventName = events[i].split('.')[0];
        table.addRow(i + 1, events[i], '✅');
        client.on(eventName, event.bind(null, client));
    } catch(e) {
        table.addRow(i + 1, events[i], '❌');
    }
}
console.log(table.toString() + "\n");

client.login(env.TOKEN);

// client.on("messageCreate", (msg) => {
    // const voiceChannel = msg.member?.voice.channel;
    // if(msg.content == "!join") {
    //     if (voiceChannel) {
    //         joinVoiceChannel({
    //           channelId: voiceChannel.id,
    //           guildId: voiceChannel.guild.id,
    //           adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    //           selfDeaf: false,
    //         });
    //     }
    // }

// });

// client.on("speech", async (msg) => {
    // if (!msg.content) return;
    // args = msg.content.toLowerCase().split(" ");
    // console.log(msg.content)
    // if (!args[0] == "okej") return;

    // let tmp1 = []
    // let tmp2 = []

    // for (let i = 1; i < 3; i++) {
    //     tmp1.push(args[i])
    // }

    // cmd = toNormalForm(tmp1.join(""));

    // for (let i = 3; i < args.length; i++) {
    //     tmp2.push(args[i])
    // }

    // args = tmp2

//     if(cmd == "ktoragodzina") {
//         var d = new Date();
//         tts(msg.channel,`${checkTime(d.getHours())}:${checkTime(d.getMinutes())}`)
//         // msg.author.send(`${checkTime(d.getHours())}:${checkTime(d.getMinutes())}`);
//     }

//     if(cmd == "pominmuzyke") {
//         var guildQueue = player.nodes.get(msg.channel.guild.id);
//         if (!guildQueue || !guildQueue.isPlaying())
//             return tts(msg.channel, "Ale ja tu nie robie imprezy obecnie...");

//         if (guildQueue.tracks.length < 1 && guildQueue.repeatMode !== 3) {
//             if(guildQueue.isPlaying()) {
//                 guildQueue.node.pause();
//             }
//             return tts(msg.channel, "Tu nie ma co pomijac XD");
//         }

//         guildQueue.node.skip();
//     }

//     if(cmd == "zagrajmuzyke") {
//         var guildQueue = player.nodes.get(msg.channel.guild.id);
//         let result = await player.search(args.join(" "), { requestedBy: msg.user }).catch(() => { });
//         if (!result || !result.tracks.length)
//             return tts(msg.channel, `Nie znalazlem nic takiego jak ${args.join(" ")}.`);
//         let queue;
//         if (guildQueue) {
//             queue = guildQueue;
//             queue.metadata = msg;
//         } else {
//             queue = await player.nodes.create(msg.channel.guild.id,{
//                 metadata: msg
//             });
//         }
//         result.playlist ? queue.addTrack(result.tracks) : queue.addTrack(result.tracks[0]);
//         await queue.player.play(msg.channel,queue.tracks.toArray());
//     }
// });

// client.on("ready", () => {
//   console.log("Ready!");
// });

// client.login("MTA5MDY1MDQyNDYxMDE0ODU0Mw.Gdef7t.CWSMK0bOwfwmd5z8ykEj7dC4ubc5EfOovvjhkw");