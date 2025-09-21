// date.js
const { differenceInMilliseconds, differenceInMinutes } = require('date-fns');

// ---- Exercise 1: Time until Jan 1 ----
function timeUntilNewYear() {
    const now = new Date();
    const nextYear = new Date(now.getFullYear() + 1, 0, 1); // Jan 1 next year
    const diffMs = differenceInMilliseconds(nextYear, now);

    const days = Math.floor(diffMs / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diffMs / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diffMs / 1000 / 60) % 60;
    const seconds = Math.floor(diffMs / 1000) % 60;

    return `The 1st January is in ${days} days and ${hours}:${minutes}:${seconds} hours`;
}

// ---- Exercise 2: Minutes lived ----
function minutesLived(birthDateStr) {
    const birthDate = new Date(birthDateStr); // Example: '1998-09-21T00:00:00'
    const now = new Date();
    const minutes = differenceInMinutes(now, birthDate);
    return `You have lived ${minutes} minutes`;
}

// ---- Exercise 3: Next holiday ----
function nextHoliday() {
    const now = new Date();
    const holidayDate = new Date('2025-12-25T00:00:00'); // Hardcoded holiday (Christmas)
    const diffMs = differenceInMilliseconds(holidayDate, now);

    const days = Math.floor(diffMs / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diffMs / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diffMs / 1000 / 60) % 60;
    const seconds = Math.floor(diffMs / 1000) % 60;

    return `The next holiday (Christmas) is in ${days} days and ${hours}:${minutes}:${seconds} hours`;
}

module.exports = { timeUntilNewYear, minutesLived, nextHoliday };
