const path = require('path');

module.exports = {
  entry: './src/index.js', // your React entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'), // output directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
