//1- Using a DOM property, retrieve the h1 and console.log it.
let h1 = document.querySelector("h1");
console.log(h1);

//2- Using DOM methods, remove the last paragraph in the <article> tag.
let article = document.querySelector("article");
let lastParagraph = article.querySelector("p:last-of-type");
article.removeChild(lastParagraph);
console.log(article);
// explain p:last-of-type
// The :last-of-type pseudo-class matches the last <p> element within the <article> tag, allowing us to specifically target and remove it.
// 3- Add a event listener which will change the background color of the h2 to red, when it’s clicked on.
let h2 = document.querySelector("h2");
h2.addEventListener("click", function() {
    h2.style.backgroundColor = "red";
});

//4-Add an event listener which will hide the h3 when it’s clicked on (use the display:none property).
let h3 = document.querySelector("h3");
h3.addEventListener("click", function() {
    h3.style.display = "none";
});
//5-Add a <button> to the HTML file, that when clicked on, should make the text of all the paragraphs, bold.
let button = document.createElement("button");
button.innerHTML = "Make paragraphs bold";
document.body.appendChild(button);

button.addEventListener("click", function() {
    let paragraphs = document.querySelectorAll("p");
    paragraphs.forEach(function(p) {
        p.style.font = "bold";
    });
});
//6-BONUS : When you hover on the h1, set the font size to a random pixel size between 0 to 100.(Check out this documentation)
h1.addEventListener("mouseover", function() {
    let randomSize = Math.floor(Math.random() * 101);
    h1.style.fontSize = randomSize + "px";
});

//7-BONUS : When you hover on the 2nd paragraph, it should fade out (Check out “fade css animation” on Google)
let secondParagraph = document.querySelector("article p:nth-of-type(2)");
secondParagraph.addEventListener("mouseover", function() {
    secondParagraph.style.transition = "opacity 0.5s";
    secondParagraph.style.opacity = 0;
});



// Exercise 2 : Work with forms



//1-Retrieve the form and console.log it.
let form = document.querySelector("form");
console.log(form);
//2-Retrieve the inputs by their id and console.log them.
let fnameinput = document.querySelector("#fname");
let lnameinput = document.querySelector("#lname");
console.log(fnameinput);
console.log(lnameinput);

//3-Retrieve the inputs by their name attribute and console.log them.
let fnameinput1 = document.querySelector("[name=firstname]");
let lnameinput1 = document.querySelector("[name=lastname]");
console.log(fnameinput1);
console.log(lnameinput1);
//4-When the user submits the form (ie. submit event listener)
form.addEventListener("submit", function(event) {
    event.preventDefault(); 
//get the values of the input tags,
    let fname = fnameinput1.value;
    let lname = lnameinput1.value;
//make sure that they are not empty,
    if (fname === "" || lname === "") {
        console.log("Please fill in all fields.");
        return;
    }
//create an li per input value, then append them to a the <ul class="usersAnswer"></ul>, below the form.
    let usersAnswer = document.querySelector(".usersAnswer");
    let li1 = document.createElement("li");
    li1.textContent = "First Name: " + fname;
    let li2 = document.createElement("li");
    li2.textContent = "Last Name: " + lname;
    usersAnswer.appendChild(li1);
    usersAnswer.appendChild(li2);


    console.log("Form submitted");
    console.log("First Name:", fname);
    console.log("Last Name:", lname);
});



//Exercise 3 : Transform the sentence
//Declare a global variable named allBoldItems.
let allBoldItems = document.querySelectorAll("strong");
//Create a function called getBold_items() that takes no parameter.
function getBold_items() {
    return allBoldItems;
}
//Create a function called highlight() that changes the color of all the bold text to blue.
function highlight() {
    allBoldItems.forEach(function(item) {
        item.style.color = "blue";
    });
}
//Create a function called returnItemsToDefault() that changes the color of all the bold text back to black.
function returnItemsToDefault() {
    allBoldItems.forEach(function(item) {
        item.style.color = "black";
    });
}
//Call the function highlight() on mouseover (ie. when the mouse pointer is moved onto the paragraph), and the function returnItemsToDefault() on mouseout (ie. when the mouse pointer is moved out of the paragraph).
let paragraph = document.querySelector("article p");
paragraph.addEventListener("mouseover", highlight);
paragraph.addEventListener("mouseout", returnItemsToDefault);

//Exercice 4 : Volume of a sphere
//Js code  to calculate the volume of a sphere
let form1 = document.querySelector("#MyForm");
form1.addEventListener("submit", function(event) {
    event.preventDefault();
    let radius = parseFloat(document.querySelector("#radius").value);
    let volume = (4/3) * Math.PI * Math.pow(radius, 3);
    document.querySelector("#volume").value = volume;
});
console.log(form1);


