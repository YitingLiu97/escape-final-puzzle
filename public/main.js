const socket = io();
const content = document.getElementById('content');
const computerImg = document.getElementById('computer');
const poemImg = document.getElementById('poem');
const recipeImg = document.getElementById('recipe');
const backgroundImg = document.getElementById('backgroundImg');
const computerModalContainer = document.getElementById("computerModalContainer");
const keyModalContainer = document.getElementById("keyModalContainer");
const escapeModalContainer = document.getElementById("escapeModalContainer");

socket.on('connect', function () {
  console.log("Connected");

  socket.on('command', (command) => {
    if (command === 'ESCAPE') {
      openEscapeModal();
    }
  });
});



function onClick(e) {
  const x = e.clientX;
  const y = e.clientY;

  const recipeX = 35.3 / 100 * window.innerWidth;
  const recipeY = 18.9 / 100 * window.innerWidth;
  const recipeR = 2.5 / 100 * window.innerWidth;
  const poemX = 60.8 / 100 * window.innerWidth;
  const poemY = 29.3 / 100 * window.innerWidth;
  const poemR = 1.5 / 100 * window.innerWidth;
  const compX = 44.8 / 100 * window.innerWidth;
  const compY = 25.4 / 100 * window.innerWidth;
  const compR = 4.3 / 100 * window.innerWidth;
  const keyX = 12.5 / 100 * window.innerWidth;
  const keyY = 29.2 / 100 * window.innerWidth;
  const keyR = 1.5 / 100 * window.innerWidth;

  const distToRecipe = dist(x, y, recipeX, recipeY);
  const distToPoem = dist(x, y, poemX, poemY);
  const distToComp = dist(x, y, compX, compY);
  const distToKey = dist(x, y, keyX, keyY);

  if (distToRecipe <= recipeR) {
    content.style.display = "block";
    recipeImg.style.display = "block";
    poemImg.style.display = "none";
    computerImg.style.display = "none";
  } else if (distToPoem <= poemR) {
    content.style.display = "block";
    poemImg.style.display = "block";
    computerImg.style.display = "none";
    recipeImg.style.display = "none";

  } else if (distToComp <= compR) {
    openComputerModal()
  } else if (distToKey <= keyR) {
    openKeyModal()
  } else {
    content.style.display = "none";
  }

}

function onMouseMove(e) {
  const x = e.clientX;
  const y = e.clientY;

  const recipeX = 35.3 / 100 * window.innerWidth;
  const recipeY = 18.9 / 100 * window.innerWidth;
  const recipeR = 2.5 / 100 * window.innerWidth;
  const poemX = 60.8 / 100 * window.innerWidth;
  const poemY = 29.3 / 100 * window.innerWidth;
  const poemR = 1.5 / 100 * window.innerWidth;
  const compX = 44.8 / 100 * window.innerWidth;
  const compY = 25.4 / 100 * window.innerWidth;
  const compR = 4.3 / 100 * window.innerWidth;
  const keyX = 12.5 / 100 * window.innerWidth;
  const keyY = 29.2 / 100 * window.innerWidth;
  const keyR = 1.5 / 100 * window.innerWidth;

  const distToRecipe = dist(x, y, recipeX, recipeY);
  const distToPoem = dist(x, y, poemX, poemY);
  const distToComp = dist(x, y, compX, compY);
  const distToKey = dist(x, y, keyX, keyY);

  if (distToRecipe <= recipeR || distToPoem <= poemR || distToComp <= compR || distToKey <= keyR) {
    backgroundImg.style.cursor = 'pointer'
  } else {
    backgroundImg.style.cursor = 'default'
  }
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}


function openComputerModal() {
  computerModalContainer.style.display = "block";
}
function openKeyModal() {
  keyModalContainer.style.display = "block";
}
function openEscapeModal() {
  closeComputerModal()
  closeKeyModal()
  escapeModalContainer.style.display = "block";
}
function closeComputerModal() {
  computerModalContainer.style.display = "none";
}
function closeKeyModal() {
  keyModalContainer.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == computerModalContainer) closeComputerModal();
  if (event.target == keyModalContainer) closeKeyModal();
}

