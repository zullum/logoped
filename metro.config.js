const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

// Set cache directory before loading config (Yarn PnP compatibility)
process.env.CACHE_DIRECTORY = path.join(__dirname, 'node_modules', '.cache');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
