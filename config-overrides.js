const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "path": require.resolve("path-browserify"),
    "stream": require.resolve("stream-browserify"),
    "fs": false
  };
  
  return config;
}