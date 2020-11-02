const path = require('path');
module.exports = {
  entry: "./src/main.tsx",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'kanban-app', 'public')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.js$/, use: ["source-map-loader"], enforce: "pre" }
    ]
  },
  devServer: {
    open: true
  },
  devtool: 'source-map'
}