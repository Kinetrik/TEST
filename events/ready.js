const fs = require("fs");
const ascii = require("ascii-table");
const table = new ascii("Komendy");

module.exports = (client) => {
    //Handler
    var commands = fs.readdirSync('./commands').filter( f => f.endsWith('.js'));
    for(let i = 0; i < commands.length; i++) {
        try {
            var event = require('../commands/' + commands[i]);
            table.addRow(i + 1, commands[i], '✅');
        } catch(e) {
            table.addRow(i + 1, commands[i], '❌');
        }
    }
    console.log(table.toString());
}