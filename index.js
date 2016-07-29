var serverPort = 3000;
var http = require('http');
var path = require('path');
var app = require('express')();
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

var server = http.createServer(app);
server.listen(serverPort);
server.on('listen', function () {
    log.info('Spinning up server. Access via localhost:' + serverPort);
});
