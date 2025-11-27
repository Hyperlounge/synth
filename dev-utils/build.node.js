
const { rollup } = require('rollup');
const { minify } = require('uglify-js');
const fs = require('fs');
const uniqueFilename = require('unique-filename');

const mainSourceName = 'js/synth-options.mjs';
const mainOutName = uniqueFilename('js', 'main') + '.mjs';

fs.rmSync('./build', {recursive: true});
fs.mkdirSync('./build');
fs.mkdirSync('./build/js');
fs.mkdirSync('./build/styles');

fs.cpSync('manifest.json', 'build/manifest.json');
fs.cpSync('media', 'build/media', {recursive: true});
fs.cpSync('library', 'build/library', {recursive: true});
fs.cpSync('styles/synth.css', 'build/styles/synth.css');

const index = fs.readFileSync('index.html', 'utf8');

fs.writeFileSync('build/index.html', index.replace(/js\/synth-options\.mjs/s, mainOutName));


rollup({
    input: mainSourceName,
}).then(bundle => {
    bundle.generate({}).then(output => {

        const { code } = output.output[0];

        const minified = minify(code).code;

        fs.writeFile(`./build/${mainOutName}`, minified, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("File written successfully\n");
                    }
                });
    });
});

