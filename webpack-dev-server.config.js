const baseConfig = require('./webpack.config')[3];

const config = {
  ...baseConfig

  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   compress: true,
  //   port: 9000
  // }
};

module.exports = config;
