module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'store': '@/store',
      }
    }
  }
}
// vue.config.js
// const path = require('path');

// module.exports = {
//   configureWebpack: {
//     resolve: {
//       alias: {
//         assets: path.join(__dirname, 'src/assets'),
//       },
//     },
//   },
// };

