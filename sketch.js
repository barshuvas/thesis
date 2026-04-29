let recognition;
let currentNumber = 1;
let lastHeard = "";
let feedback = "Say the number 1";

const numberWords = {
  1: ["one"],
  2: ["two", "to", "too"],
  3: ["three"],
  4: ["four", "for"],
  5: ["five"],
  6: ["six"],
  7: ["seven"],
  8: ["eight"],
  9: ["nine"],
  10: ["ten"]
};

function setup() {
  createCanvas(600, 300);
  textAlign(CENTER, CENTER);
  textSize(24);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    feedback = "Speech recognition not supported in this browser";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = handleResult;
  recognition.start();
}

function draw() {
  background(245);

  text(`Current target: ${currentNumber}`, width / 2, 80);
  text(`Last heard: "${lastHeard}"`, width / 2, 140);
  text(feedback, width / 2, 200);
}

function handleResult(event) {
  let lastResult = event.results[event.results.length - 1][0];
  let spoken = lastResult.transcript.toLowerCase().trim();
  lastHeard = spoken;

  if (isCorrectNumber(spoken, currentNumber)) {
    feedback = `✅ Correct! Now say ${currentNumber + 1}`;
    currentNumber++;

    if (currentNumber > 10) {
      feedback = "🎉 Done! You counted to ten!";
      recognition.stop();
    }
  } else {
    feedback = `❌ Try again. Say ${currentNumber}`;
  }
}

function isCorrectNumber(spoken, target) {
  let validWords = numberWords[target];
  return validWords.some(word => spoken.includes(word));
}
