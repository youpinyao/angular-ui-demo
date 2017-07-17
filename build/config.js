module.exports = {
  host: '0.0.0.0',
  port: '8686',
  publicPath: '//static.seeyouyima.com/ad-finance.meiyou.com/',
  path: 'dist',
  theme: 'front/scss/_theme.scss',
  vendor: 'front/js/vendor.js',
  entrys: [{
    filename: '../views/index.html',
    template: './front/index.html',
    entry: './front/js/app.js',
  }, {
    filename: '../views/404.html',
    template: './front/404.html',
    entry: './front/js/404.js',
  }]
};
