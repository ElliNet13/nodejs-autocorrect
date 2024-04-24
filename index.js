const readline = require('readline');
const commonWords = require('an-array-of-english-words');
const natural = require('natural');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function input(prompt, callback) {
  rl.question(prompt, (answer) => {
    callback(answer);
  });
}

function stwl(inputString) {
  return inputString.split(/\s+/);
}

function fcw(commonWords, targetWord) {
  let maxSimilarity = -Infinity;
  let closestWord = "";

  for (const word of commonWords) {
    const similarity = natural.JaroWinklerDistance(targetWord, word);
    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      closestWord = word;
    }
  }

  return closestWord;
}

input('Enter something to autocorrect: ', (userInput) => {
  rl.close();
  const words = stwl(userInput);
  let output = "";
  for (const word of words) {
    output += fcw(commonWords, word) + " ";
  }
  console.log("Autocorrect output: " + output);
});