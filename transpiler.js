const fs = require("fs");

const inputPath = process.argv[2];
const sourceCode = fs.readFileSync(inputPath, "utf-8");

let i = 0;

while (i < sourceCode.length) {
  const char = sourceCode[i];

  if (/[a-zA-Z]/.test(char)) {
    let start = i;

    while (i < sourceCode.length && /[a-zA-Z]/.test(sourceCode[i])) {
      i++;
    }

    console.log("WORD: " + sourceCode.slice(start, i));
    continue;
  }

  if (/[0-9]/.test(char)) {
    let start = i;

    while (i < sourceCode.length && /[0-9]/.test(sourceCode[i])) {
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

  if (/[(){}\[\]]/.test(char)) {
    console.log("PUNCT: " + sourceCode[i]);
    i++;
    continue;
  }

  if (/[+\-*/!<>=.]/.test(char)) {
    const twoChars = sourceCode.slice(i, i + 2);
    if (twoChars === "//" || twoChars === "/*") {
      i = handleComments(twoChars, i);
      continue;
    }
    if (twoChars === "**" || twoChars === "--" || twoChars === ">=") {
      console.log("OPERATOR: " + twoChars);
      i += 2;
      continue;
    } else if (sourceCode.slice(i, i + 3) === "...") {
      console.log("OPERATOR: ...");
      i += 3;
      continue;
    } else {
      console.log("OPERATOR: " + sourceCode[i]);
      i++;
      continue;
    }
  }

  if (/[|¬~]/.test(char)) {
    let start = i;
    let stringType = char;
    i++;

    while (sourceCode[i] != stringType) {
      i++;
      if (i >= sourceCode.length) {
        console.error(
          `Unclosed String detected. ShitScript cannot compile until faulty String is closed with "${stringType}".`,
        );
        return;
      }
    }

    i++;

    console.log("STRING: " + sourceCode.slice(start, i));
    continue;
  }
  i++;
}

function handleComments(commentType, i) {
  if (commentType === "//") {
    let start = i;

    while (!/[\n]/.test(sourceCode[i])) {
      i++;
    }

    console.log("COMMENT: " + sourceCode.slice(start, i));
  } else if (commentType === "/*") {
    let start = i;

    while (sourceCode.slice(i, i + 2) !== "*/") {
      i++;
      if (i >= sourceCode.length) {
        console.error("Unclosed Multiline Comment. ShitScript cannot compile until the Multiline Comment is closed.");
        return;
      }
    }

    i += 2;
    console.log("MULTILINE COMMENT: " + sourceCode.slice(start, i));
  }
  return i;
}
