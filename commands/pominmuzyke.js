const {tts} = require('../utils.js');

module.exports.run = async (client, msg, args) => {
    var guildQueue = client.player.nodes.get(msg.channel.guild.id);
    console.log(guildQueue.tracks)
    if (!guildQueue || !guildQueue.isPlaying())
        return tts(msg.channel, "Ale ja tu nie robie imprezy obecnie...");

    if (guildQueue.tracks.length < 1 && guildQueue.repeatMode !== 3) {
        if(guildQueue.isPlaying()) {
            guildQueue.node.pause();
        }
        return tts(msg.channel, "Tu nie ma co pomijac XD");
    }

    guildQueue.node.skip();
}