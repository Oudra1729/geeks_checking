let client = "John";

const groceries = {
    fruits: ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice: "20$",
    other: {
        paid: true,
        meansOfPayment: ["cash", "creditCard"]
    }
};

// ================== displayGroceries ==================
// Arrow function that logs the fruits using forEach
const displayGroceries = () => {
    groceries.fruits.forEach(fruit => console.log(fruit));
};

displayGroceries(); 
// Output:
// pear
// apple
// banana


// ================== cloneGroceries ==================
const cloneGroceries = () => {
    // Copy primitive value (string)
    let user = client;

    // Change client
    client = "Betty";

    console.log("client:", client); // Betty
    console.log("user:", user);     // John
    // Why? Because strings are primitives → passed by value
    // So "user" keeps its own copy

    // Reference copy
    let shopping = groceries;

    // Change values inside the object
    shopping.totalPrice = "35$";
    shopping.other.paid = false;

    console.log("shopping.totalPrice:", shopping.totalPrice); // 35$
    console.log("groceries.totalPrice:", groceries.totalPrice); // 35$
    // Why? Objects are passed by reference → both point to the same object

    console.log("shopping.other.paid:", shopping.other.paid); // false
    console.log("groceries.other.paid:", groceries.other.paid); // false
    // Same reason: reference copy, nested objects also shared
};

cloneGroceries();
