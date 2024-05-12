

const fs = require('fs');

const json = {
    library: []
};

// Function to get current filenames
// in directory
fs.readdir(__dirname + '/../library', (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(fileName => {
             if (/^.*\.hspatch\.json$/.test(fileName)) {
                const [name, bank] = fileName.replace(/^([^-]+)- ([^./]+)\.hspatch\.json$/, '$2/$1').split('/');
                json.library.push({name, bank, fileName});
            }
        });
        fs.writeFile(__dirname + '/../library/index.json', JSON.stringify(json, null, 2), (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
            }
        });
    }
});



