export default {
  plugins: {
    autoprefixer: {},
    cssnano: {
      preset: ['default', {
        discardComments: { removeAll: true },
        normalizeWhitespace: true,
        convertValues: true,
        mergeLonghand: true,
        mergeRules: true,
      }]
    }
  }
}
