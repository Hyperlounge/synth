
const fs = require('fs');
const markdownIt = require('markdown-it');

function stripMultiline(text) {
    return text.replace(/^[ \n]*(.*?)[ \n]*$/s, '$1').replace(/\.\.\/media\//sg, 'media/');
}

const sourceFile = fs.readFileSync('../docs/live-help-source.md', 'utf8');

const md = markdownIt({html: true});

const defines = {};
const modules = {};

sourceFile.match(/\{define: *.*?\}.*?\{end-define\}/sg).forEach(match => {
    const parts = match.match(/\{define: *(.*?) *\}(.*?)\{end-define\}/s);
    defines[parts[1]] = stripMultiline(parts[2]);
});

sourceFile.match(/\{module: *.*?\}.*?\{end-module\}/sg).forEach(match => {
    const parts = match.match(/\{module: *(.*?) *\}(.*?)\{end-module\}/s);
    const moduleName = parts[1];
    let template = stripMultiline(parts[2]);
    template = template.replace(/\{ *include: *(.*?) *\}/sg, (match, p1) => {
        return defines[p1];
    });
    template = template.replace(/\{ *control: *(\S+?) *\}/sg, (match, p1) => {
        return `{control: ${moduleName} > ${p1}}`;
    });
    template = template.replace(/\{ *control: *(\S+?) *> *(\S+?) *\}([^{]*)/sg, (match, p1, p2, p3) => {
        (modules[p1] || (modules[p1] = {controls: {}})).controls[p2] = {
            html: md.render(stripMultiline(p3)),
        }
        return `\n\${help.modules.${p1}.controls.${p2}.html}`;
    });
    template = template.replace(/^(.*?)(\$\{.*)$/s, (match, p1, p2) => {
        return `${md.render(stripMultiline(p1))}\n${p2}`
    });
    (modules[moduleName] || (modules[moduleName] = {controls: {}})).template = template;
});

let doc = `const help = {modules: {`;
Object.keys(modules).forEach(moduleName => {
    const module = modules[moduleName];
    doc += `\n  ${moduleName}: {`
         + (module.template ? `\n    template: help => \`${module.template}\`,` : '')
         + `\n    controls: {`;

    Object.keys(module.controls).forEach(controlName => {
        const control = module.controls[controlName];
        doc += `\n      ${controlName}: {`
             + `\n        html: \`${control.html}\`,`
             + `\n      },`
    })
    doc += `\n    },`
         + `\n  },`;
});

doc += `
}};

function getHelpHtml(moduleName, controlName) {
    const moduleData = help.modules[moduleName];
    const controlData = help.modules[moduleName].controls[controlName];
    if (controlName === undefined) {
        return moduleData ? moduleData.template(help) : undefined;
    } else {
        return controlData ? controlData.html : (moduleData ? moduleData.template(help) : undefined);
    }
}

export default getHelpHtml`;


fs.writeFile('../js/misc/getHelp.js', doc, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File written successfully\n");
            }
        });