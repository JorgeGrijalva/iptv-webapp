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
  secure: false,
  protocolRewrite: 'https',
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Origin', 'http://biza.tv');
    proxyReq.setHeader('Referer', 'http://biza.tv');
  },
  pathRewrite: {
    '^/api': '',
    '^/live': '/live',
    '^/movie': '/movie',
    '^/series': '/series',
    '^/xmltv.php': '/xmltv.php',
    '^/get.php': '/get.php'
  },
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['access-control-allow-origin'] = '*';
    proxyRes.headers['access-control-allow-methods'] = 'GET, POST, OPTIONS';
    proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Authorization';
    proxyRes.headers['content-security-policy'] = 'upgrade-insecure-requests';
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
  }
});

app.use('/', proxy);

module.exports = app; 