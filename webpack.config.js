const webpack = require('webpack');

module.exports = {
  context: __dirname + '/js',

  entry: {
    engine:  "./engine/index",
    app: "./app"
  },

  output: {
    path:     __dirname + '/public',
    filename: "[name].js",
    library:  "[name]"
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: "cheap-inline-module-source-map",

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      LANG:     JSON.stringify('ru')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    })
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates:    ['*-loader', '*'],
    extensions:         ['', '.js']
  },


  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      },
      exclude: /node_modules/
    }]
  }
};


