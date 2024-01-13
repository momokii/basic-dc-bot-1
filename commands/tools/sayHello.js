const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sayhello')
        .setDescription('Say Hello to Me!'),

    async execute(interaction, client) {
        await interaction.deferReply({
            fetchReply: true
        })

        const user = interaction.user

        const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1 // start index = 0
        const day = today.getDate()
        const hours = today.getHours()
        const minutes = today.getMinutes()

        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
        const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`

        await interaction.editReply({
            content: 'Hello ' + user.username +  '!\n' + 'Sekarang adalah hari ' + daysOfWeek[today.getDay()] + ' tanggal ' + formattedDate + ' pukul ' + formattedTime
        })
    }
}