const { faker } = require('@faker-js/faker');

const users = [];

function addUser() {
    const user = {
        name: faker.name.fullName(),
        street: faker.address.street(),
        country: faker.address.country()
    };
    users.push(user);
    console.log('Added user:', user);
}

module.exports = { addUser, users };
