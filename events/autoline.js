const client = require("../index");
const { EmbedBuilder} = require('discord.js')

const {Database} = require('st.db')

client.on("messageCreate", (message) => {
    const linedb = new Database('./json/autoline.json')
    const line_channels = linedb.get('autoline_rooms')
    if (line_channels.includes(message.channelId)) {
      if (message.author.bot) return;
        message.channel.send(linedb.get('autoline'))
    }
  });