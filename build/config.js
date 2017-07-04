module.exports = {
  host: '0.0.0.0',
  port: '8686',
  publicPath: '../',
  path: 'dist',
  theme: 'front/scss/_theme.scss',
  vendor: 'front/js/vendor.js',
  entrys: [{
    filename: './view/index.html',
    template: './front/index.html',
    entry: './front/js/app.js',
  }, {
    filename: './view/404.html',
    template: './front/404.html',
    entry: './front/js/404.js',
  }]
};
