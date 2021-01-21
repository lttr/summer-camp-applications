module.exports = {
  devServer: {
    proxy: {
      '^/__/firebase': {
        target: 'http://localhost:5500',
      },
    },
  },
}
