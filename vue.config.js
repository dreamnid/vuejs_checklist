module.exports = {
  lintOnSave: false,
  // Fix Safari bugs
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      // safari dev fix: https://github.com/vuejs/vue-cli/issues/1132
      config.
        output.
        filename('[name].[hash].js').
        end()
    } else if (process.env.NODE_ENV === 'test') {
      // mochapack fix: https://github.com/vuejs/vue-cli/issues/4053
      const scssRule = config.module.rule('scss')
      scssRule.uses.clear()
      scssRule.
        use('null-loader').
        loader('null-loader')
    }
  }
};
