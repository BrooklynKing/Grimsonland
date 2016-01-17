const webpack = require('webpack');

module.exports = {
    context: require('path').join(__dirname, '/js'),

    entry: {
        phaser: "./phaser/index",
        gameConfigs: "./configs/index"
    },

    output: {
        path: __dirname + '/public',
        filename: "[name].js",
        library: "[name]"
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: "cheap-inline-module-source-map",

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            LANG: JSON.stringify('ru')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        })
    ],

    module: {
        loaders: [
            {
                loader: 'script',
                test: /(pixi|phaser).js/
            },
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                },
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        host: 'localhost',
        port: '8080'
    }
};


