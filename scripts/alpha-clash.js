function continueGame() {
  resetAllKeyHighlights();

  const alphabet = getARandomAlphabet();
  const currentAlphabet = document.getElementById("current-alphabet");
  currentAlphabet.innerText = alphabet;

  setBackgroundColorById(alphabet);
}

function resetAllKeyHighlights() {
  const keys = document.querySelectorAll(".kbd");
  keys.forEach((key) => {
    key.classList.remove("bg-orange-400");
  });
}

function handleKeyboardKeyUpEvent(event) {
  const playerPressed = event.key.toLowerCase();
  handleKeyPress(playerPressed);
}

function handleKeyPress(playerPressed) {
  if (playerPressed === 'escape') {
    gameOver();
    return;
  }

  const currentAlphabet = document.getElementById("current-alphabet").innerText.toLowerCase();

  if (playerPressed === currentAlphabet) {
    const currentScore = getTextElementValueById("current-score");
    setTextElementValueById("current-score", currentScore + 1);
    removeBackgroundColorById(currentAlphabet);
    continueGame();
  } else {
    const currentLife = getTextElementValueById("current-life");
    const updatedLife = currentLife - 1;
    setTextElementValueById("current-life", updatedLife);

    if (updatedLife === 0) {
      gameOver();
    }
  }
}

function enterGame() {
  hideElementByID("home-screen");
  hideElementByID("final-score");
  showElementById("play-ground");

  setTextElementValueById("current-life", 5);
  setTextElementValueById("current-score", 0);

  setupKbdButtons();
  continueGame();
}

function goHome() {
  hideElementByID("play-ground");
  hideElementByID("final-score");
  showElementById("home-screen");

  setTextElementValueById("current-life", 5);
  setTextElementValueById("current-score", 0);

  localStorage.removeItem("screen");
}

function gameOver() {
  hideElementByID("play-ground");
  showElementById("final-score");

  const lastScore = getTextElementValueById("current-score");
  setTextElementValueById("last-score", lastScore);

  const currentAlphabet = getElementTextById("current-alphabet").toLowerCase();
  removeBackgroundColorById(currentAlphabet);
}

// Detect mobile and set up kbd buttons for touch input
function setupKbdButtons() {
  if (!isMobileDevice()) return;

  const keys = document.querySelectorAll(".kbd");

  keys.forEach((keyEl) => {
    
    const newKey = keyEl.cloneNode(true);
    keyEl.parentNode.replaceChild(newKey, keyEl);

    newKey.addEventListener("click", () => {
      const key = newKey.innerText.trim().toLowerCase();
      handleKeyPress(key);

      
      if ("vibrate" in navigator) navigator.vibrate(18);
    });
  });
}
// mobile device
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

// PC only
if (!isMobileDevice()) {
  document.addEventListener("keyup", handleKeyboardKeyUpEvent);
}
