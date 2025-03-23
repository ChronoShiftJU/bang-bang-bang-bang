import { getDefaultConfig } from "expo/metro-config";

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  sourceExts: ["ts", "tsx", "js", "jsx"],
};

export default config;
