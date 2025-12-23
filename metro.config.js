// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require('nativewind/metro');
 
// const config = getDefaultConfig(__dirname)

// config.transformer.unstable_allowRequire = true; 
// config.transformer.minifierConfig = {
//   keep_classnames: true,
//   keep_fnames: true,
// };
 
// module.exports = withNativeWind(config, { input: './global.css' })

// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // 🔧 Fix al error InternalBytecode.js
  config.transformer.unstable_allowRequire = true;
  config.transformer.minifierConfig = {
    keep_classnames: true,
    keep_fnames: true,
  };

  // 🔥 Mantener compatibilidad con NativeWind
  return withNativeWind(config, { input: "./global.css" });
})();
