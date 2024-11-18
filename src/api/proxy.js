const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

const proxy = createProxyMiddleware({
  target: 'http://biza.tv',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['access-control-allow-origin'] = '*';
    proxyRes.headers['access-control-allow-methods'] = 'GET, POST, OPTIONS';
    proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Authorization';
  }
});

app.use('/api', proxy);
app.use('/live', proxy);
app.use('/movie', proxy);
app.use('/series', proxy);

module.exports = app; 