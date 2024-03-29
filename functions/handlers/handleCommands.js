const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('fs')

module.exports = (client) => {
    client.handleCommands =  async() => {
        const commandFolders = fs.readdirSync('./commands')
        for(const folder of commandFolders) {
            const commandsFiles = fs
            .readdirSync('./commands/' + folder)
            .filter(file => file.endsWith('.js'))


            const {commands, commandArray} = client
            for(const file of commandsFiles) {
                const command = require('../../commands/' + folder + '/' + file)

                commands.set(command.data.name, command)
                commandArray.push(command.data.toJSON())

                console.log('command loaded: ' + command.data.name)
            }
        }

        const clientId = 'YOUR_CLIENT_ID'
        const guildId = 'YOUR_GUILD_ID'
        const rest = new REST({ version: '9' }).setToken(process.env.token)
        try {
            console.log('Started refreshing application (/) commands.')

            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: client.commandArray,
            })

            console.log('Successfully reloaded application (/) commands.')

        } catch(e) {
            console.error(e)
        }
    }
}