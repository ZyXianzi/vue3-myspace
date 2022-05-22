const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
        '/api': {
            target: `https://app165.acapp.acwing.com.cn/api`,
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    },
    proxy: {
      '/myspace': {
          target: `https://app165.acapp.acwing.com.cn/myspace`,
          changeOrigin: true,
          pathRewrite: {
              '^/myspace': ''
          }
      }
    }
  },
})
