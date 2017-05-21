module.exports = {
    entry: {
        app: './src/app/App.jsx',
    },
    output: {
        path: `${__dirname}/data/js`,
        filename: '[name]-bundle.js',
    },
    module: {
        loaders: [
        {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react'],
            },
        },
        ],
    },
    node: {
        fs: 'empty',
    }
};
