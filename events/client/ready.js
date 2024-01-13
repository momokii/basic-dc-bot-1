module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('ready! on ' + client.user.tag + ' is online!')
    }
}