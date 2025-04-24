const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

const bgRadios = document.querySelectorAll('input[name="background"]');
const slider = document.getElementById('slider');
const item1Checkbox = document.getElementById('plane');
const item2Checkbox = document.getElementById('rocket');
const item3Checkbox = document.getElementById('submarine');

let images = {};
let characterX = parseInt(slider.value);

const loadImages = () => {
  const names = ['pictures/sky.jpg', 'pictures/space.jpg', 'pictures/ocean.jpg', 'pictures/character.png', 'pictures/rocket.png', 'pictures/plane.png', 'pictures/submarine.png'];
  names.forEach(name => {
    const img = new Image();
    img.src = name;
    images[name] = img;
  });
};

loadImages();

function getSelectedBackground() {
  for (let radio of bgRadios) {
    if (radio.checked) return radio.value;
  }
}

function drawScene() {
  const bg = images[getSelectedBackground()];
  const character = images['pictures/character.png'];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  if (item1Checkbox.checked) ctx.drawImage(images['pictures/rocket.png'], 800, 180, 90, 190);
  if (item2Checkbox.checked) ctx.drawImage(images['pictures/plane.png'], 80, 220, 230, 100);
  if (item3Checkbox.checked) ctx.drawImage(images['pictures/submarine.png'], 340, 300, 210, 120);

  ctx.drawImage(character, characterX, 20, 120, 120);
}

slider.addEventListener('input', () => {
  characterX = parseInt(slider.value);
  drawScene();
});

document.getElementById('controls').addEventListener('input', drawScene);

function playSound(n) {
  const audio = new Audio(`audio/sound${n}.mp3`);
  audio.play();
}

window.onload = () => setTimeout(drawScene, 100);
