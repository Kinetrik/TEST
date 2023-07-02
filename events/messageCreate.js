const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = async (client, msg) => {
    const voiceChannel = msg.member?.voice.channel;
    if(msg.content == "!join") {
        if (voiceChannel) {
            joinVoiceChannel({
              channelId: voiceChannel.id,
              guildId: voiceChannel.guild.id,
              adapterCreator: voiceChannel.guild.voiceAdapterCreator,
              selfDeaf: false,
            });
        }
    }
}