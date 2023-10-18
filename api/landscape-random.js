require('dotenv').config()
const axios = require('axios')

const token = process.env.WALLHAVEN_TOKEN
const apiUrl = 'https://wallhaven.cc/api/v1/search'

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Version': 'v1',
        'apikey': token
    },
    params: {
        'resolutions': '1920x1080',
        'sorting': 'random'
    }
};

const landscapeRandomReq = async (bot, chatId) => {
    try {
        bot.sendMessage(chatId, 'Processing...')
        const response = await axios.request(apiUrl, options);
        const jsonResponse = Object.values(response.data.data).slice(0, 5);
        const medias = []
        jsonResponse.forEach(media => {
            medias.push({
                type: 'photo',
                media: media.path
            })
        })
        bot.sendMediaGroup(chatId, medias)
    } catch (error) {
        console.log('Error:', error)
    }
}


module.exports = {
    landscapeRandomReq
}