const axios = require('axios');
const chalk = require('chalk');

async function getWeather(city) {
    try {
        const apiKey = 'OPENWEATHERMAP_API_KEY';
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = response.data;
        console.log(chalk.blue.bold(`Weather in ${city}:`));
        console.log(chalk.yellow('Temperature:'), data.main.temp + '°C');
        console.log(chalk.green('Description:'), data.weather[0].description);
    } catch (err) {
        console.error(chalk.red('Error fetching weather:'), err.message);
    }
}

module.exports = getWeather;
