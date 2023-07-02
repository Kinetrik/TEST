const {tts,checkTime} = require('../utils.js');

module.exports.run = async (client, msg, args) => {
    var d = new Date();
    tts(msg.channel,`${checkTime(d.getHours())}:${checkTime(d.getMinutes())}`)
}