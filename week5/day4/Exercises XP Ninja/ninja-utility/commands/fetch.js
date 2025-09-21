const axios = require('axios');

async function fetchData() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        console.log('Fetched data:', response.data);
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

module.exports = fetchData;
