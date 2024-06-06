module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            assets: "./assets",
            components: "./src/components",
            constants: "./src/constants",
            hooks: "./src/hooks",
            locale: "./src/locale",
            providers: "./src/providers",
            navigation: "./src/navigation",
            screens: "./src/screens",
            service: "./src/services",
            store: "./src/store",
            theme: "./src/theme",
            utils: "./src/utils",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
