const fs = require("fs");
const {toNormalForm} = require('../utils.js');
const env = require("dotenv").config().parsed;
// const test = require('../commands/ktoragodzina.js');

module.exports = async (client, msg) => {
    if (!msg.content) return;
    args = msg.content.toLowerCase().split(" ");
    if (!args[0] == env.PREFIX) return;
    
    let tmp1 = []
    let tmp2 = []
    
    for (let i = 1; i < 3; i++) {
        tmp1.push(args[i])
    }
    
    cmd = toNormalForm(tmp1.join(""));
    
    for (let i = 3; i < args.length; i++) {
        tmp2.push(args[i])
    }
    
    args = tmp2
    console.log(msg.content)
    
    if(fs.existsSync(`./commands/${cmd}.js`)) {
        var command = require(`../commands/${cmd}.js`);
        await command.run(client, msg, args);
    }
}