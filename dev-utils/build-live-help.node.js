
const fs = require('fs');
const markdownIt = require('markdown-it');

function stripMultiline(text) {
    return text.replace(/^[ \n]*(.*?)[ \n]*$/s, '$1').replace(/\.\.\/media\//sg, 'media/');
}

function processHtml(html) {
    return html.replace(/<thead.*?<\/thead>/sg, '');
}

const sourceFile = fs.readFileSync('../docs/live-help-source.md', 'utf8');

const md = markdownIt({html: true});

const defines = {};
const modules = {};

let doc = `<div class="help">\n`;


sourceFile.match(/\{define: *.*?\}.*?\{end-define\}/sg).forEach(match => {
    const parts = match.match(/\{define: *(.*?) *\}(.*?)\{end-define\}/s);
    defines[parts[1]] = stripMultiline(parts[2]);
});

sourceFile.match(/\{module: *.*?\}.*?(\{module:|\{define:|$)/sg).forEach(match => {
    const parts = match.match(/\{module: *(.*?) *\}(.*?)(\{module:|\{define:|$)/s);
    const moduleName = parts[1];
    let moduleContent = stripMultiline(parts[2]);
    moduleContent = moduleContent.replace(/\{ *include: *(.*?) *\}/sg, (match, p1) => {
        return defines[p1];
    });
    moduleContent = moduleContent.replace(/\{ *control: *(\S+?) *\}/sg, (match, p1) => {
        return `{control: ${moduleName} > ${p1}}`;
    });
    moduleContent = moduleContent.replace(/\{ *control: *(\S+?) *> *(\S+?) *\}([^{]*)/sg, (match, p1, p2, p3) => {
        return `<div class="control" data-module="${p1}" data-control="${p2}">\n\n${stripMultiline(p3)}\n</div>\n`;
    });
    modules[moduleName] = moduleContent;
    doc += `<div class="panel" data-module="${moduleName}">${processHtml(md.render(moduleContent))}</div>`;
});

doc += "\n</div>";

fs.writeFile('../live-help/output.html', doc, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File written successfully\n");
            }
        });