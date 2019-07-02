const path = require('path');

module.exports = {
    mode: 'production',
    entry: './dist/out-tsc/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    }
};