const fs = require("fs");

const inputPath = process.argv[2];
const sourceCode = fs.readFileSync(inputPath, "utf-8");

console.log(sourceCode);