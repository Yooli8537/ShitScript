const fs = require("fs");

const inputPath = process.argv[2];
const sourceCode = fs.readFileSync(inputPath, "utf-8");

let i = 0;
let WORD = false;
let NUMBER = false;
let WHITESPACE = false;

while (i < sourceCode.length) {
  const char = sourceCode[i];

  if (/[a-zA-Z]/.test(char)) {
    let start = i;

    while (/[a-zA-Z]/.test(sourceCode[i])) {
      i++;
    }

    console.log("WORD: " + sourceCode.slice(start, i));
    continue;
  }

  if (/[0-9]/.test(char)) {
    let start = i;

    while (/[0-9]/.test(sourceCode[i])) {
      i++;
    }

    console.log("NUMBER: " + sourceCode.slice(start, i));
    continue;
  }

  if (/[\s]/.test(char)) {
    let start = i;

    while (/[\s]/.test(sourceCode[i])) {
      i++;
    }
    continue;
  }

  if (/[().]/.test(char)) {
    console.log("PUNCT: " + sourceCode[i]);
    i++;
    continue;
  }
  i++;
}
