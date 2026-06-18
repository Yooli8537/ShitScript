const fs = require("fs");

const inputPath = process.argv[2];
const sourceCode = fs.readFileSync(inputPath, "utf-8");

let i = 0;

while (i < sourceCode.length) {
  const char = sourceCode[i];

  if (/[a-zA-Z]/.test(char)) {
    let start = i;

    while (/[a-zA-Z]/.test(sourceCode[i])) {
      i++;
    }

    console.log("WORD: " + sourceCode.slice(start, i));
    continue;
  } else if (/[0-9]/.test(char)) {
    let start = i;

    while (/[0-9]/.test(sourceCode[i])) {
      i++;
    }

    console.log("NUMBER: " + sourceCode.slice(start, i));
    continue;
  }
  i++;
}
