var serverPort = 3000;
var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
var log = require('bunyan')
    .createLogger({
        name: 'miniProject',
        streams: [
            {
                stream: process.stderr
            },
            {
                path: path.resolve(__dirname, './log', 'development.log')
            }
        ]
    });

app.use(express.static(path.resolve(__dirname, './public')));

// disabling performance cache so that we can avoid potential sudo issues on installations
process.env.BABEL_DISABLE_CACHE = 1;
require('babel-register')({
    ignore: false,
    presets: ['es2015', 'react'],
    extensions: ['.jsx']
});
var React = require('react');
var ReactServer = require('react-dom/server');
var Layout = require('./server/components/Layout');

app.get('/', function (req, res) {
    var markup = ReactServer.renderToString(React.createElement(Layout, {
        title: 'Sample App'
    }));

    res.send('<!DOCTYPE html>' + markup);
});

app.get('/api/incoming', function (req, res) {
    res.send(require('./server/mockData/incoming.json'));
});

var server = http.createServer(app);
server.listen(serverPort);
server.on('listen', function () {
    log.info('Spinning up server. Access via localhost:' + serverPort);
});
