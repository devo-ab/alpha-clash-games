function continueGame() {
  const alphabet = getARandomAlphabet();

  const currentAlphabet = document.getElementById("current-alphabet");
  currentAlphabet.innerText = alphabet;

  setBackgroundColorById(alphabet);
}

function handleKeyboardKeyUpEvent() {
  const playerPressed = event.key;
  if(playerPressed === 'Escape'){
    gameOver();
  }
  const currentAlphabet = document.getElementById("current-alphabet");
  const targetAlphabet = currentAlphabet.innerText;
  const exceptedAlphabet = targetAlphabet.toLowerCase();

  if (playerPressed === exceptedAlphabet) {
    // console.log('You got a point');
    // console.log('you have pressed correctly', exceptedAlphabet);
    const currentScore = document.getElementById("current-score");
    const currentScoreText = currentScore.innerText;
    const upScore = parseInt(currentScoreText);
    const updatedScore = upScore + 1;
    currentScore.innerText = updatedScore;

    removeBackgroundColorById(exceptedAlphabet);
    continueGame();
  } else {
    // console.log('You loss a live');
    const currentLife = document.getElementById("current-life");
    const currentLifeText = currentLife.innerText;
    const upLife = parseInt(currentLifeText);
    const updatedLife = upLife - 1;
    currentLife.innerText = updatedLife;

    if (updatedLife === 0) {
      gameOver();
    }
  }
}

document.addEventListener("keyup", handleKeyboardKeyUpEvent);

// function play(){
//     const homeScreen = document.getElementById('home-screen');
//     homeScreen.classList.add('hidden');

//     const playGround = document.getElementById('play-ground');
//     playGround.classList.remove('hidden');
// }
function enterGame() {
  hideElementByID("home-screen");
  hideElementByID("final-score");
  showElementById("play-ground");

  setTextElementValueById('current-life', 5);
  setTextElementValueById('current-score', 0);
  continueGame();
}

function gameOver() {
  hideElementByID("play-ground");
  showElementById("final-score");

  const lastScore = getTextElementValueById('current-score');
  setTextElementValueById('last-score', lastScore);

  const currentAlphabet = getElementTextById('current-alphabet');
  removeBackgroundColorById(currentAlphabet);
}
