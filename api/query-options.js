require('dotenv').config();
const axios = require('axios');

const token = process.env.WALLHAVEN_TOKEN;
const apiUrl = 'https://wallhaven.cc/api/v1/search'
let currentCallbackListener = null;
let sorting, resolution, query = null
const apiRequest = async (sorting, resolution, query) => {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Version': 'v1',
            'apikey': token
        },
        params: {
            'sorting': sorting,
            'resolutions': resolution,
            'q': query
        }
    }

    const response = await axios.request(apiUrl, options)
    return Object.values(response.data.data).slice(0, 5)
}

const queryOptions = async (bot, chatId) => {
    try {
        const orientationOptions = {
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

        bot.sendMessage(chatId, '*Choose the orientation below:*', orientationOptions)

        if (currentCallbackListener) {
            bot.removeListener('callback_query', currentCallbackListener);
        }

        currentCallbackListener = (callbackQuery) => {
            const data = callbackQuery.data;

            if (data === '1920x1080' || data === '1080x1920') {
                resolution = data;
                const sortingOptions = {
                    chat_id: callbackQuery.message.chat.id,
                    message_id: callbackQuery.message.message_id,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'Relevance', callback_data: 'relevance' },
                                { text: 'Date Added', callback_data: 'dateAdded' }
                            ],
                            [
                                { text: 'Random', callback_data: 'random' },
                                { text: 'Toplist', callback_data: 'toplist' }
                            ]
                        ]
                    }
                }
                bot.editMessageText('*Choose the sorting below:*', sortingOptions);
            } else if (data === 'relevance' || data === 'dateAdded' || data === 'random' || data === 'toplist') {
                sorting = data
                const categories = {
                    chat_id: callbackQuery.message.chat.id,
                    message_id: callbackQuery.message.message_id,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'Nature', callback_data: 'nature' },
                                { text: 'Artwork', callback_data: 'artwork' }
                            ],
                            [
                                { text: 'Abstract', callback_data: 'abstract' },
                                { text: 'Futuristic', callback_data: 'futuristic' }
                            ],
                            [
                                { text: 'City', callback_data: 'city' },
                                { text: 'Sky', callback_data: 'sky' }
                            ],
                            [
                                { text: 'Anime', callback_data: 'anime' },
                                { text: 'Cars', callback_data: 'car' }
                            ]
                        ]
                    }
                }
                bot.editMessageText('*Choose the category below:*', categories)

            } else {
                query = data
                userResponse(sorting, resolution, query)
            }
        }
        bot.on('callback_query', currentCallbackListener)

        const userResponse = async (sorting, resolution, query) => {
            const jsonResponse = await apiRequest(sorting, resolution, query)
            if (jsonResponse.length === 0) {
                bot.sendMessage(chatId, 'There was an error trying to send the message. Try again later...')
            } else {
            const medias = []
            jsonResponse.forEach(media => {
                medias.push({
                    type: 'photo',
                    media: media.path
                })
            })
            bot.sendMediaGroup(chatId, medias)
        }
        }
    } catch (error) {
        bot.sendMessage(chatId, 'There was an error trying to send the message')
    }
}

module.exports = {
    queryOptions
}