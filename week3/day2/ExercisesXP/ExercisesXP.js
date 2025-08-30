/**********************************************
 * Exercise 1: Numbers Divisible by 23 (or any)
 **********************************************/
function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    let result = [];
    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            result.push(i);
            sum += i;
        }
    }
    console.log("Numbers divisible by", divisor + ":", result.join(" "));
    console.log("Sum:", sum);
}

// Example usage
displayNumbersDivisible();      // default 23
displayNumbersDivisible(3);     // bonus
displayNumbersDivisible(45);    // bonus

/**********************************************
 * Exercise 2: Shopping List
 **********************************************/
const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry":1
};

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry":10
};

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
    let total = 0;
    for (let item of shoppingList) {
        if (stock[item] > 0) {
            total += prices[item];
            stock[item]--; // bonus: decrease stock
        }
    }
    return total;
}

console.log("Total Bill:", myBill());

/**********************************************
 * Exercise 3: What’s in my wallet?
 **********************************************/
function changeEnough(itemPrice, amountOfChange) {
    const [quarters, dimes, nickels, pennies] = amountOfChange;
    const total = quarters*0.25 + dimes*0.10 + nickels*0.05 + pennies*0.01;
    return total >= itemPrice;
}

// Examples
console.log(changeEnough(4.25, [25, 20, 5, 0]));  // true
console.log(changeEnough(14.11, [2,100,0,0]));   // false
console.log(changeEnough(0.75, [0,0,20,5]));     // true

/**********************************************
 * Exercise 4: Vacation Costs
 **********************************************/
function hotelCost(nights) {
    return nights * 140;
}

function planeRideCost(destination) {
    if (destination.toLowerCase() === "london") return 183;
    if (destination.toLowerCase() === "paris") return 220;
    return 300;
}

function rentalCarCost(days) {
    let cost = days * 40;
    if (days > 10) cost *= 0.95; // 5% discount
    return cost;
}

function totalVacationCost() {
    const nights = Number(prompt("How many nights?"));
    const destination = prompt("Destination?");
    const days = Number(prompt("Car rental days?"));

    const hotel = hotelCost(nights);
    const plane = planeRideCost(destination);
    const car = rentalCarCost(days);

    console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}.`);
    return hotel + plane + car;
}

// Uncomment to run
// totalVacationCost();

/**********************************************
 * Exercise 5: Users
 **********************************************/
const div = document.getElementById("container");
console.log(div);

document.querySelectorAll("ul")[0].children[1].textContent = "Richard";
document.querySelectorAll("ul")[1].children[1].remove();

const lists = document.querySelectorAll("ul");
lists.forEach(list => list.children[0].textContent = "Brahim"); // replace first li

lists.forEach(list => list.classList.add("student_list"));
lists[0].classList.add("university", "attendance");

div.style.backgroundColor = "lightblue";
div.style.padding = "10px";

document.querySelectorAll("li").forEach(li => {
    if (li.textContent === "Dan") li.style.display = "none";
    if (li.textContent === "Richard") li.style.border = "1px solid black";
});

document.body.style.fontSize = "18px";

// Bonus alert
if (div.style.backgroundColor === "lightblue") {
    const users = Array.from(div.textContent.match(/\w+/g));
    alert(`Hello ${users.join(" and ")}`);
}

/**********************************************
 * Exercise 6: Change the navbar
 **********************************************/
const nav = document.getElementById("navBar");
nav.setAttribute("id", "socialNetworkNavigation");

const newLi = document.createElement("li");
newLi.textContent = "Logout";
nav.querySelector("ul").appendChild(newLi);

const ul = nav.querySelector("ul");
console.log("First:", ul.firstElementChild.textContent);
console.log("Last:", ul.lastElementChild.textContent);

/**********************************************
 * Exercise 7: My Book List
 **********************************************/
const allBooks = [
    {title: "Harry Potter", author: "J.K. Rowling", image: "https://via.placeholder.com/100", alreadyRead: true},
    {title: "The Hobbit", author: "J.R.R. Tolkien", image: "https://via.placeholder.com/100", alreadyRead: false}
];

const section = document.querySelector(".listBooks");

allBooks.forEach(book => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${book.title} written by ${book.author}</p>`;
    const img = document.createElement("img");
    img.src = book.image;
    div.appendChild(img);
    if (book.alreadyRead) div.style.color = "red";
    section.appendChild(div);
});
