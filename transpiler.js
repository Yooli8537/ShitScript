const fs = require("fs");

const inputPath = process.argv[2];
const sourceCode = fs.readFileSync(inputPath, "utf-8");

for (let i = 0; i < sourceCode.length; i++) {
    const char = sourceCode[i];
    console.log(i, JSON.stringify(char));
}