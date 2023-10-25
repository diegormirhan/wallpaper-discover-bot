require('dotenv').config();
const axios = require('axios');

const token = process.env.WALLHAVEN_TOKEN;
const apiUrl = 'https://wallhaven.cc/api/v1/search'


const apiRequest = async (orientation, opts) => {
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
            'q': opts
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
                        {text: 'Landscape', callback_data: '1920x1080'},
                        {text: 'Portrait', callback_data: '1080x1920'}
                    ]
                ]
            }
        }

        const sortingOptions = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Relevance', callback_data: 'relevance'},
                        {text: 'Date Added', callback_data: 'dateAdded'}
                    ],
                    [
                        {text: 'Random', callback_data: 'random'},
                        {text: 'Toplist', callback_data: 'toplist'}
                    ]
                ]
            }
        }

        const categories = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Nature', callback_data: 'nature'},
                        {text: 'Artwork', callback_data: ''}
                    ]
                ]
            }
        }
    } catch (error) {
        console.log('Error:', error)
    }
}
