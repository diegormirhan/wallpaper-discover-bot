require('dotenv').config()
const axios = require('axios')

const acess_key = 'JvmLAMaMJkO8zDhXQ4OI3uvgzJplBa77'
const apiUrl = 'https://wallhaven.cc/api/v1/search'

const options = {
    method: 'GET',
    headers: {
      'Accept-Version': 'v1',
      'apikey': `${acess_key}`
    },
    params: {
      'resolutions': '1080x1920',
      'sorting': 'random'
    }
  };


axios.get(apiUrl, options)
    .then(response => {
        console.log(Object.values(response.data.data).slice(0, 5));
        const medias = []
        const jsonResponse = Object.values(response.data.data).slice(0, 5);
        jsonResponse.forEach(media => {
          medias.push({
            type: 'photo',
            media: media.path
          })                
        })
        console.log(medias);

    })
    .catch(error => {
        console.log(error)
    })

