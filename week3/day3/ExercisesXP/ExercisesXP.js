// Using a DOM property, retrieve the h1 and console.log it.
let h1 = document.querySelector("h1");
console.log(h1);

console.log("helllllo");
// Using DOM methods, remove the last paragraph in the <article> tag.
let article = document.querySelector("article");
let lastParagraph = article.querySelector("p:last-of-type");
article.removeChild(lastParagraph);
console.log(article);
// explain p:last-of-type
// The :last-of-type pseudo-class matches the last <p> element within the <article> tag, allowing us to specifically target and remove it.
// Add a event listener which will change the background color of the h2 to red, when it’s clicked on.
let h2 = document.querySelector("h2");
h2.addEventListener("click", function() {
    h2.style.backgroundColor = "red";
});

