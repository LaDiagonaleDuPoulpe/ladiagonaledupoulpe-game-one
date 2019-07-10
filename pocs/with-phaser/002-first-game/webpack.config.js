const path = require('path');

module.exports = {
    mode: 'production',
    entry: './dist/out-tsc/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};