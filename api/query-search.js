require('dotenv').config();
const axios = require('axios');

const token = process.env.WALLHAVEN_TOKEN
const apiUrl = 'https://wallhaven.cc/api/v1/search'
let currentCallbackListener = null;


const apiRequest = async (orientation, query) => {
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

    const response = await axios.request(apiUrl, options)
    return Object.values(response.data.data).slice(0, 5)

}

const querySearch = async (bot, chatId) => {
    try {
        const opts = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Landscape', callback_data: '1920x1080' },
                        { text: 'Portrait', callback_data: '1080x1920' }
                    ]
                ]
            }
        }

        bot.sendMessage(chatId, 'Choose the orientation below:', opts)

        if (currentCallbackListener) {
            bot.removeListener('callback_query', currentCallbackListener);
        }
        

        currentCallbackListener = (callbackQuery) => {
            const data = callbackQuery.data;

            if (data === '1920x1080' || data === '1080x1920') {
                userResponse(data);
            }
        }
        bot.on('callback_query', currentCallbackListener)

        const userResponse = (data) => {
            bot.sendMessage(chatId, 'Enter the query you want to search...')
            bot.once('message', async (msg) => {
                const searchReq = msg.text;
                const jsonResponse = await apiRequest(data, searchReq)
                console.log(jsonResponse)
                const medias = []
                jsonResponse.forEach(media => {
                    medias.push({
                        type: 'photo',
                        media: media.path
                    })
                })
                bot.sendMediaGroup(chatId, medias)

            })
        }
        } catch (error) {
            console.log('Error:', error)
        }
    }

module.exports = {
        querySearch
    }