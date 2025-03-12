const { configure, presets } = require("eslint-kit")

module.exports = configure({
  root: __dirname,
  allowDebug: process.env.NODE_ENV !== 'production' && !process.env.CI,

  presets: [
    presets.imports(),
    presets.node(),
    presets.prettier(),
    presets.typescript({ enforceUsingType: true }),
  ],

  extend: {
    ignorePatterns: ['!**/*', 'node_modules', 'dist', '.eslintrc.cjs'],
  },
})