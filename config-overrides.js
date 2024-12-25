const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = function override(config, env) {
  // Optimize chunking for TensorFlow and MediaPipe packages
  config.optimization = {
    ...config.optimization,
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        tensorflow: {
          test: /[\\/]node_modules[\\/](@tensorflow|@mediapipe)[\\/]/,
          name: "tensorflow",
          chunks: "async",
          priority: 10
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: -10
        }
      }
    }
  };

  if (env === "production") {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: true
      })
    );
  }

  return config;
};
