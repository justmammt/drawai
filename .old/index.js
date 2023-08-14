const { AoiClient, LoadCommands } = require("aoi.js");
const { Panel } = require("@akarui/aoi.panel");
require('dotenv').config()
var fs = require('fs');

const bot = new AoiClient({
    token: process.env.TOKEN,
    prefix: "i!",
    intents: ["MessageContent", "Guilds", "GuildMessages"],
    events: ["onMessage"],
    database: {
        type: "aoi.db",
        db: require("@akarui/aoi.db"),
        tables: ["main"],
        path: "./database/",
        extraOptions: {
            dbType: "KeyValue"
        }
    }
});
const loader = new LoadCommands(bot);
loader.load(bot.cmd, "./commands/");

const panel = new Panel({
    port: 3000,
    client: bot
})

panel.loadAPI({
    auth: " Authentication key here (random string)"//no spaces, keep it only alphanumeric...
})

panel.loadGUI({
    username: ["justmammt", "username 2"],
    password: ["mariop2009", "Password 2"],
})

bot.status({
    type: "WATCHING",
    text: "InvokeAI API - localhost:9090"
})
bot.command({
    name: "ping",
    code: `Pong! $pingms`
});

