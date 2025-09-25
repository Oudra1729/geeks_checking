// shop.js
const products = require("./products");

function findProduct(name) {
  return products.find((p) => p.name.toLowerCase() === name.toLowerCase());
}

console.log(findProduct("Laptop"));
console.log(findProduct("Shoes"));
console.log(findProduct("Phone"));
