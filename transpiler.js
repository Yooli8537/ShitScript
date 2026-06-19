const fs = require("fs");

const inputPath = process.argv[2];
const sourceCode = fs.readFileSync(inputPath, "utf-8");

let i = 0;
let WORD = false;
let NUMBER = false;

while (i < sourceCode.length) {
  const char = sourceCode[i];

  if (/[a-zA-Z0-9]/.test(char)) {
    if (/[a-zA-Z]/.test(char)) {
      WORD = true;
    } else if (/0-9]/) {
      NUMBER = true;
    }
    let start = i;

    while (/[a-zA-Z0-9]/.test(sourceCode[i])) {
      i++;
    }

    if (WORD) {
      console.log("WORD: " + sourceCode.slice(start, i));
      WORD = false;
    } else if (NUMBER) {
      console.log("NUMBER: " + sourceCode.slice(start, i));
      NUMBER = false;
    }
    continue;
  }
  i++;
}
