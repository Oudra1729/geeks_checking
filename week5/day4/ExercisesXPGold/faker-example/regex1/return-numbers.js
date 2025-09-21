function returnNumbers(str) {
    return str.match(/\d+/g).join('');
}

module.exports = returnNumbers;
