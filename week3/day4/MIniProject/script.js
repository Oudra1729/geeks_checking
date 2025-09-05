const rows = 40;
const cols = 60;
const cellSize = 20;
const colors = [
  "red","orangered","orange","yellow","yellowgreen","lightgreen","green",
  "turquoise","cyan","lightskyblue",
  "indigo","darkmagenta","violet","lightpink","lightgray","gray","black","white"
];

const main = document.getElementById("main");
const palette = document.getElementById("palette");
const clearBtn = document.getElementById("clear");

main.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;


for (let i = 0; i < colors.length; i++) {
  const swatch = document.createElement("div");
  swatch.style.backgroundColor = colors[i];
  palette.appendChild(swatch);
}


const totalCells = rows * cols;
for (let i = 0; i < totalCells; i++) {
  const cell = document.createElement("div");
  cell.style.width = `${cellSize}px`;
  cell.style.height = `${cellSize}px`;
  main.appendChild(cell);
}


let currentColor = null;
let isMouseDown = false;


palette.addEventListener("click", (e) => {
  if (e.target && e.target.style && e.target.style.backgroundColor) {
    currentColor = e.target.style.backgroundColor;
  }
});


main.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  if (e.target && e.target.parentElement === main && currentColor) {
    e.target.style.backgroundColor = currentColor;
  }
});
document.body.addEventListener("mouseup", () => (isMouseDown = false));


main.addEventListener("mouseover", (e) => {
  if (isMouseDown && e.target && e.target.parentElement === main && currentColor) {
    e.target.style.backgroundColor = currentColor;
  }
});


clearBtn.addEventListener("click", () => {
  const cells = main.children;
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = "white";
  }
});
