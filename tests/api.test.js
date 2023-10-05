require('dotenv').config()
const axios = require('axios')

const acess_key = process.env.UNSPLASH_ACESS_KEY
const apiUrl = 'https://api.unsplash.com/photos/random'

const options = {
    headers: {
      'Accept-Version': 'v1',
      'Authorization': `Client-ID ${acess_key}`
    },
    params: {
      count: 5,
      orientation: 'landscape',
      w: 1920,
      h: Math.floor(1920 * (9 / 16)),
      fit: 'crop',
      crop: 'top'
    }
  };

axios.get(apiUrl, options)
    .then(response => {
        console.log(response.data[0].urls.full);
    })
    .catch(error => {
        console.log(error)
    })

