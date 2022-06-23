const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = {
  '/data': {
    changeOrigin: true,
    target: process.env.REACT_APP_BASE_API,
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