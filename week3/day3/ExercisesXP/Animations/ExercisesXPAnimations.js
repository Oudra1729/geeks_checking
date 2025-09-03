// Part I: setTimeout alert after 2 seconds
setTimeout(() => {
    alert("Hello World");
}, 2000);

// Part II: setTimeout to add a paragraph after 2 seconds
setTimeout(() => {
    const container = document.getElementById("container");
    const p = document.createElement("p");
    p.textContent = "Hello World";
    container.appendChild(p);
}, 2000);

// Part III: setInterval to add a paragraph every 2 seconds
const container = document.getElementById("container");
let interval = setInterval(() => {
    const p = document.createElement("p");
    p.textContent = "Hello World";
    container.appendChild(p);

    // Stop interval if there are 5 paragraphs
    if (container.children.length >= 5) {
        clearInterval(interval);
    }
}, 2000);

// Stop interval when user clicks button
document.getElementById("clear").addEventListener("click", () => {
    clearInterval(interval);
});



function myMove() {
    const box = document.getElementById("animate");
    const container = document.getElementById("container2");
    let pos = 0;

    const interval = setInterval(frame, 1); // move 1px every 1ms

    function frame() {
        if (pos >= container.clientWidth - box.offsetWidth) {
            clearInterval(interval); // stop at the end
        } else {
            pos++;
            box.style.left = pos + "px";
        }
    }
}
