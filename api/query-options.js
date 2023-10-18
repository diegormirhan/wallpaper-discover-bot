require('dotenv').config();
const axios = require('axios');

const token = process.env.WALLHAVEN_TOKEN;
const apiUrl = 'https://wallhaven.cc/api/v1/search'

const options = {
    method: 'GET',
    headers: {
        
    }
}