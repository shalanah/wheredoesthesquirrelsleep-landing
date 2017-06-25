const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const extractSass = new ExtractTextPlugin({
  filename: './public/assets/css/styles.css'
})
const uglify = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  output: {
    comments: false
  }
})

module.exports = {
  entry: './client/entry.js',
  output: {
    path: __dirname,
    filename: './public/assets/js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {loader: "css-loader", options: {importLoaders: 2, url: false}},
            {loader: 'postcss-loader', options: {plugins: () => [autoprefixer]}},
            "sass-loader"
          ],
          fallback: 'style-loader',
        })
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [
              require('babel-plugin-transform-object-rest-spread'),
              require('babel-plugin-transform-object-assign')
            ]
          }
      }]
    }]
  },
  plugins: [
    extractSass,
    uglify,
  ]
}