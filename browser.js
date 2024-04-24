function autocorrect(inputString) {
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

  const words = stwl(inputString);
  let output = "";
  for (const word of words) {
    output += fcw(commonWords, word) + " ";
  }
  return output.trim();
}

// Example usage:
const userInput = prompt('Enter something to autocorrect: ');
const autocorrectedOutput = autocorrect(userInput);
alert("Autocorrect output: " + autocorrectedOutput);