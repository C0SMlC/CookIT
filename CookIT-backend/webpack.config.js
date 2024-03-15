const path = require('path');

module.exports = {
  mode: 'development',
  entry: './public/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './public/js'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Add this rule to handle CSS files
      },
    ],
  },
};
