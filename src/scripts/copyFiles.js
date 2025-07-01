import fs from 'fs-extra';

fs.copySync('./src/scripts', './dist/src/scripts',
    { filter: (src) => {
        return !src.includes('copyFiles.js');
    }}
);

if(fs.existsSync('publisher.jar')) {
    fs.copySync('publisher.jar', './dist/src/publisher.jar');
}