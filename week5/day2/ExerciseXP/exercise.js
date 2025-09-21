// =========================
// Exercise 1 : Giphy API
// =========================
async function fetchHilariousGifs() {
    try {
        const response = await fetch("https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
fetchHilariousGifs();


// =========================
// Exercise 2 : Giphy API (sun gifs)
// =========================
async function fetchSunGifs() {
    try {
        const response = await fetch("https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
fetchSunGifs();


// =========================
// Exercise 3 : Async function (SWAPI)
// =========================
async function fetchStarship() {
    try {
        const response = await fetch("https://www.swapi.tech/api/starships/9/");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log(data.result);
    } catch (error) {
        console.error(error);
    }
}
fetchStarship();


// =========================
// Exercise 4 : Analyze
// =========================
function resolveAfter2Seconds() {
    return new Promise(resolve => setTimeout(() => resolve('resolved'), 2000));
}

async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(result);
}
asyncCall();
