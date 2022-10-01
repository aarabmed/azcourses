const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const webpack = require("webpack");
const path = require("path");




const nextConfig = {
  webpack(config,options){
    config.resolve.modules.push(path.resolve("./"));
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  staticPageGenerationTimeout: 90,
}

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withImages]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig })
}

