//Get the value of each of the inputs in the HTML file when the form is submitted. Remember the event.preventDefault()
document.querySelector("#libform").addEventListener("submit", function(event) {
    event.preventDefault();

    let noun = document.querySelector("#noun").value;
    let adjective = document.querySelector("#adjective").value;
    let person = document.querySelector("#person").value;
    let verb = document.querySelector("#verb").value;
    let place = document.querySelector("#place").value;

    //Make sure the values are not empty
    if (!noun || !adjective || !person || !verb || !place) {
        console.log("Please fill in all fields.");
        return;
    }
    //Write a story that uses each of the values.
    let story = `Once upon a time, there was a ${adjective} ${noun} who loved to ${verb} in ${place}. One day, ${person} joined in on the fun!`;
    document.querySelector("#story").textContent = story;
});         
//add html
document.querySelector("#story").style.display = "block";
document.querySelector("#story").style.border = "2px solid black";
document.querySelector("#story").style.padding = "10px";
document.querySelector("#story").style.marginTop = "20px";
document.querySelector("#story").style.backgroundColor = "#f9f9f9";
document.querySelector("#story").style.fontFamily = "Arial, sans-serif";
document.querySelector("#story").style.lineHeight = "1.5";
//Make sure you check the console for errors when playing the game.
if (document.querySelector("#story").textContent === "") {
    console.error("Story is not being displayed.");
}
// Shuffle the story when the button is clicked
document.querySelector("#shuffle").addEventListener("click", function() {
    let stories = [
        `Once upon a time, there was a ${adjective} ${noun} who loved to ${verb} in ${place}. One day, ${person} joined in on the fun!`,
        `In a ${place} far away, a ${adjective} ${noun} was ${verb}ing when ${person} appeared out of nowhere!`,
        `${person} was on a quest to find the ${adjective} ${noun} who could ${verb} like no other in ${place}.`
    ];

    // Shuffle the stories array
    stories.sort(() => Math.random() - 0.5);

    // Display the first story
    document.querySelector("#story").textContent = stories[0];
});
