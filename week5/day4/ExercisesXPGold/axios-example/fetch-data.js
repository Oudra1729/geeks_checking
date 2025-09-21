const axios = require('axios');

async function fetchData() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        response.data.forEach(post => console.log(post.title));
    } catch (err) {
        console.error(err);
    }
}

module.exports = fetchData;
