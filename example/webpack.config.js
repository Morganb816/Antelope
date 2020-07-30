const path = require('path');

module.exports = {
    mode: 'production',
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'server', 'public'),
        filename: 'bundle.js',
        publicPath: '/',
        library: 'AntelopeNetworkExample',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [
                    path.resolve(__dirname, 'client')
                ],
                exclude: [

                ],
            }
        ]
    }
}