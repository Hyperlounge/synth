
const { rollup } = require('rollup');
const { minify } = require('uglify-js');
const fs = require('fs');

fs.rmSync('./build', {recursive: true});
fs.mkdirSync('./build');
fs.mkdirSync('./build/js');
fs.mkdirSync('./build/styles');

fs.cpSync('index.html', 'build/index.html');
fs.cpSync('manifest.json', 'build/manifest.json');
fs.cpSync('media', 'build/media', {recursive: true});
fs.cpSync('library', 'build/library', {recursive: true});
fs.cpSync('styles/synth.css', 'build/styles/synth.css');


rollup({
    input: './js/synth-options.mjs',
}).then(bundle => {
    bundle.generate({}).then(output => {

        const { code } = output.output[0];

        const minified = minify(code).code;

        fs.writeFile('./build/js/synth-options.mjs', minified, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("File written successfully\n");
                    }
                });
    });
});

