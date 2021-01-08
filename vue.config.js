const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '^/__/firebase': {
        target: 'http://localhost:5500',
      },
    },
  },
}
