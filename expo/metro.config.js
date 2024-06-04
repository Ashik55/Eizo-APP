// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */

const defaultConfig = getDefaultConfig(__dirname)

defaultConfig.watchFolders = [...defaultConfig.watchFolders, __dirname + "/../shared"]

module.exports = defaultConfig
