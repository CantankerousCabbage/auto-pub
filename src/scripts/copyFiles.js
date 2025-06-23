import fs from 'fs-extra';

fs.copySync('./src/scripts', './dist/src/scripts',
    { filter: (src) => {
        return !src.includes('copyFiles.js');
    }}
);