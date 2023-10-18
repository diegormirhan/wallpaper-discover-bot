require('dotenv').config();
const axios = require('axios');

const token = process.env.WALLHAVEN_TOKEN
const apiUrl = 'https://wallhaven.cc/api/v1/search'

const orientation = ''
const query = ''

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Version': 'v1',
        'apikey': token
    },
    params: {
        'sorting': 'random',
        'resolutions': orientation,
        'q': query
    }
}

const querySearch = async (bot, chatId) => {
    try {
        const opts = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Landscape', callback_data: '1920x1080'},
                        { text: 'Portrait', callback_data: '1080x1920'}
                    ]
                ]
            }
        }

        await bot.sendMessage(chatId, 'Choose the orientation below:', opts)

        bot.on('callback_query', (callbackQuery) => {
            const msg = callbackQuery.message;
            orientation  = callbackQuery.data;

            bot.answerCallbackQuery(callbackQuery.id);
            bot.sendMessage(chatId, '*Type the query you want to search*', {parse_mode: 'Markdown'});
        })

        await bot.once('message', (msg) => {
            const searchReq = msg.text;
            query = searchReq

            const response = axios.request(apiUrl, options)
            const jsonResponse = Object.values(response.data.data).slice(0, 5);
            const medias = []

            jsonResponse.forEach(media => {
                medias.push({
                    type: 'photo',
                    media: media.path
                })
            })
            bot.sendMediaGroup(chatId, medias)

        })
    } catch (error) {
        console.log('Error:', error)
    }
}

module.exports = {
    querySearch
}