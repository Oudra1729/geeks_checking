window.addEventListener("keydown", function(e) {
  console.log("Key pressed:", e.key);

  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) return; 

  audio.currentTime = 0; 
  audio.play();
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (key) {
    key.classList.add("playing"); // 👈 زيدنا هادي
  }          
});

const keys = document.querySelectorAll(".key");
keys.forEach(key =>
  key.addEventListener("transitionend", function(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
  })
);