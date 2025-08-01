function hideElementByID(elementId) {
  const element = document.getElementById(elementId);
  element.classList.add('hidden');
}

function showElementById(elementId) {
  const element = document.getElementById(elementId);
  element.classList.remove('hidden');
}

function setBackgroundColorById(letter) {
  const key = document.getElementById(letter.toLowerCase());
  if (key) {
    key.classList.add('bg-orange-400', 'text-white');
  }
}

function removeBackgroundColorById(letter) {
  const key = document.getElementById(letter.toLowerCase());
  if (key) {
    key.classList.remove('bg-orange-400', 'text-white');
  }
}

function getTextElementValueById(elementId) {
  const element = document.getElementById(elementId);
  return parseInt(element.innerText);
}

function setTextElementValueById(elementId, value) {
  const element = document.getElementById(elementId);
  element.innerText = value;
}

function getElementTextById(elementId) {
  const element = document.getElementById(elementId);
  return element.innerText;
}

function getARandomAlphabet() {
  const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const index = Math.floor(Math.random() * alphabets.length);
  return alphabets[index];
}
