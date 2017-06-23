const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "./public/assets/css/styles.css",
})

module.exports = {
  entry: "./client/entry.js",
  output: {
    path: __dirname,
    filename: "./public/assets/js/bundle.js"
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractSass.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
      })
    }]
  },
  plugins: [extractSass]
}