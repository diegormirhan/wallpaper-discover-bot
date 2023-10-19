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
}

const queryOptions = async (bot, chatId) => {
    
}
