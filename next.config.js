const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

module.exports = {
  poweredByHeader: false,
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
  assetPrefix: process.env.BASE_URL,
};
