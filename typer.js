var texts = [
  ".Explore a world where innovation meets inspiration every click of the way.",
  "..Discover fresh perspectives, trends, and groundbreaking ideas curated just for you.",
  "..Explore a world where innovation meets inspiration every click of the way.",
  "..ahead ahead of the curve and be part of what's shaping the future.",
];
var currentTextIndex = 0;
var i = 0;
var speed = 50;
var removeSpeed = 50;

function typeWriter() {
  var currentText = texts[currentTextIndex];
  if (i < currentText.length) {
    document.getElementById("demo").innerHTML += currentText.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else if (i === currentText.length) {
    setTimeout(removeWord, 500); // Start removing after a delay
  }
}

function removeWord() {
  let currentText = document.getElementById("demo").innerHTML;
  if (currentText.length > 1) {
    // Ensure there's always at least one character
    let lastSpaceIndex = currentText.lastIndexOf(" ");
    if (lastSpaceIndex === -1) {
      document.getElementById("demo").innerHTML = currentText.substring(
        0,
        currentText.length - 1
      );
    } else {
      document.getElementById("demo").innerHTML = currentText.substring(
        0,
        lastSpaceIndex
      );
    }
    setTimeout(removeWord, removeSpeed);
  } else {
    i = 0;
    currentTextIndex = (currentTextIndex + 1) % texts.length; // Move to the next text or loop back to the first one
    typeWriter(); // Start typing the next sentence
  }
}

// Start the typewriter animation automatically when the page loads
window.onload = typeWriter;
