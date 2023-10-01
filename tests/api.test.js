require('dotenv').config()
const axios = require('axios')

const acess_key = process.env.UNSPLASH_ACESS_KEY
const apiUrl = 'https://api.unsplash.com/photos'

const options = {
    headers: {
      'Accept-Version': 'v1',
      'Authorization': `Client-ID ${acess_key}`
    }
  };

axios.get(apiUrl, options)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error)
    })

