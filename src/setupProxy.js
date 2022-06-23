const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = {
  '/data': {
    changeOrigin: true,
    target: 'https://stm.alpha.kidsloop.net/data/',
    pathRewrite: {
      '^/data': "",
    },
  }
};

module.exports = function (app) {
  Object.keys(proxy).forEach((path) => {
    app.use(createProxyMiddleware(path, proxy[path]));
  });
};