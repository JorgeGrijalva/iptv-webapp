const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors());

// Proxy para las peticiones de la API
app.use('/api', createProxyMiddleware({
  target: 'http://biza.tv',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['content-security-policy'] = 'upgrade-insecure-requests';
  }
}));

module.exports = app; 