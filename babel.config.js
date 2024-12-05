module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};