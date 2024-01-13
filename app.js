require('dotenv').config()

const { token } = process.env
const { Client, LimitedCollection, GatewayIntentBits } = require('discord.js')
const fs = require('fs')

const client = new Client({
    intents: GatewayIntentBits.Guilds
})
client.commands = new LimitedCollection()
client.commandArray = []

const functionFolders = fs.readdirSync('./functions')
for (const folder of functionFolders) {
    const functionFiles = fs
    .readdirSync('./functions/' + folder)
    .filter(file => file.endsWith('.js'))

    for(const file of functionFiles) {
        require('./functions/' + folder + '/' + file)(client)
    }
}

client.handleEvents()
client.handleCommands()
client.login(token)
console.log('logging in...')