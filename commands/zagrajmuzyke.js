const {tts} = require('../utils.js');

module.exports.run = async (client, msg, args) => {
    var guildQueue = client.player.nodes.get(msg.channel.guild.id);
    let result = await client.player.search(args.join(" "), { requestedBy: msg.user }).catch(() => { });
    if (!result || !result.tracks.length)
        return;
    let queue;
    if (guildQueue) {
        queue = guildQueue;
        queue.metadata = msg;
    } else {
        queue = await client.player.nodes.create(msg.channel.guild.id,{
            metadata: msg
        });
    }
    result.playlist ? queue.addTrack(result.tracks) : queue.addTrack(result.tracks[0]);
    console.log(queue.tracks.toArray())
    await queue.player.play(msg.channel,queue.tracks.toArray());
}