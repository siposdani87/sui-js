const path = require('path');
const ClosurePlugin = require('closure-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [new ClosurePlugin({ mode: 'STANDARD' }, {})],
    },
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        library: 'commonjs',
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
