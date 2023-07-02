const say = require('say');
const FS = require('fs');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, NoSubscriberBehavior, AudioPlayerStatus } = require("@discordjs/voice");

function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}

function tts(voiceChannel, text) {
    if (!FS.existsSync('./temp')){
        FS.mkdirSync('./temp');
    }
    const timestamp = new Date().getTime();
    const soundPath = `./temp/${timestamp}.wav`;
    say.export(text, null, 1, soundPath, (err) => {
        if (err) {
            console.error(err);
            return;
        }else{
            connection = joinVoiceChannel({channelId:voiceChannel.id,guildId: voiceChannel.guild.id,adapterCreator: voiceChannel.guild.voiceAdapterCreator,selfDeaf: false})
            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });
            const resource = createAudioResource(soundPath);
            player.play(resource);
            connection.subscribe(player);
            player.on(AudioPlayerStatus.Idle, () => {
                FS.unlinkSync(soundPath);
            });
        }
    });
}

function toNormalForm(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports.checkTime = checkTime
module.exports.toNormalForm = toNormalForm
module.exports.tts = tts