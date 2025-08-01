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

  // ✅ Mobile vibration support
  if ("vibrate" in navigator) {
    navigator.vibrate(50);
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

// ✅ Desktop key support
document.addEventListener("keyup", (event) => {
  handleKeyPress(event.key.toLowerCase());
});

// ✅ Mobile/tap support
function setupKbdButtons() {
  const keys = document.querySelectorAll(".kbd");
  keys.forEach((keyEl) => {
    keyEl.addEventListener("click", () => {
      const key = keyEl.innerText.trim().toLowerCase();
      handleKeyPress(key);
    });
  });
}

function enterGame() {
  hideElementByID("home-screen");
  hideElementByID("final-score");
  showElementById("play-ground");

  setTextElementValueById('current-life', 5);
  setTextElementValueById('current-score', 0);

  localStorage.setItem("screen", "play-ground");

  setupKbdButtons(); // rebind key click events
  continueGame();
}

function gameOver() {
  hideElementByID("play-ground");
  showElementById("final-score");

  const lastScore = getTextElementValueById('current-score');
  setTextElementValueById('last-score', lastScore);

  const currentAlphabet = getElementTextById('current-alphabet').toLowerCase();
  removeBackgroundColorById(currentAlphabet);

  localStorage.setItem("screen", "final-score");
}

// ✅ Restore screen on reload
window.addEventListener("DOMContentLoaded", () => {
  const screen = localStorage.getItem("screen");

  if (screen === "play-ground") {
    enterGame();
  } else if (screen === "final-score") {
    hideElementByID("home-screen");
    showElementById("final-score");

    const lastScore = getTextElementValueById('current-score');
    setTextElementValueById('last-score', lastScore);
  } else {
    showElementById("home-screen");
  }
});
