function continueGame() {
  const alphabet = getARandomAlphabet();
  const currentAlphabet = document.getElementById("current-alphabet");
  currentAlphabet.innerText = alphabet.toUpperCase();
  setBackgroundColorById(alphabet);
}

function handleKeyPress(playerPressed) {
  const currentAlphabet = document.getElementById("current-alphabet");
  const targetAlphabet = currentAlphabet.innerText.toLowerCase();

  if (playerPressed === 'escape') {
    gameOver();
    return;
  }

  if (playerPressed === targetAlphabet) {
    const currentScore = document.getElementById("current-score");
    const updatedScore = parseInt(currentScore.innerText) + 1;
    currentScore.innerText = updatedScore;

    removeBackgroundColorById(targetAlphabet);
    continueGame();
  } else {
    const currentLife = document.getElementById("current-life");
    const updatedLife = parseInt(currentLife.innerText) - 1;
    currentLife.innerText = updatedLife;

    if (updatedLife === 0) {
      gameOver();
    }
  }
}

// Keyboard support (desktop)
document.addEventListener("keyup", (event) => {
  handleKeyPress(event.key.toLowerCase());
});

// Mobile/Click support for kbd buttons
function setupKbdButtons() {
  const keys = document.querySelectorAll(".kbd");
  keys.forEach((keyEl) => {
    keyEl.addEventListener("click", () => {
      const key = keyEl.innerText.trim().toLowerCase();
      handleKeyPress(key);
      if ("vibrate" in navigator) navigator.vibrate(18); // optional mobile feedback
    });
  });
}

function enterGame() {
  hideElementByID("home-screen");
  hideElementByID("final-score");
  showElementById("play-ground");

  setTextElementValueById('current-life', 5);
  setTextElementValueById('current-score', 0);

  setupKbdButtons(); // add click event to all keys

  continueGame();
}

function gameOver() {
  hideElementByID("play-ground");
  showElementById("final-score");

  const lastScore = getTextElementValueById('current-score');
  setTextElementValueById('last-score', lastScore);

  const currentAlphabet = getElementTextById('current-alphabet').toLowerCase();
  removeBackgroundColorById(currentAlphabet);
}
