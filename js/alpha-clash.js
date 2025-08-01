function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

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

  // Vibrate on mobile
  if ("vibrate" in navigator) {
    navigator.vibrate(18);
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

// Desktop keyboard support
document.addEventListener("keyup", (event) => {
  handleKeyPress(event.key.toLowerCase());
});

// Mobile-only click support for on-screen keys
function setupKbdButtons() {
  if (!isMobileDevice()) return; // Disable clicks on desktop

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

  setupKbdButtons();
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

// Restore screen on reload
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


function goHome() {
  // Hide all game sections
  hideElementByID("play-ground");
  hideElementByID("final-score");

  // Show home screen
  showElementById("home-screen");

  // Optional: Reset score and life
  setTextElementValueById('current-life', 5);
  setTextElementValueById('current-score', 0);

  // Optional: Clear saved screen
  localStorage.removeItem("screen");
}