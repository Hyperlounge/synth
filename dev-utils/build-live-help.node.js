
const fs = require('fs');
const markdownIt = require('markdown-it');

const sourceFile = fs.readFileSync('../docs/live-help-source.md', 'utf8');

const md = markdownIt();

const result = md.render(sourceFile);

fs.writeFileSync('../live-help/output.html', result);