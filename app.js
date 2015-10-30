'use strict';

var config = require('./config.json');

var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var views   = require('express-dot-engine');
var sockio  = require('socket.io')(server);

var debug = require('debug')(config.name + ':server').bind(null, '');

var controller = require('./controller');


// view engine
app.engine('dot', views.__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'dot');

// logging
app.use(function(req, res, next) {
  debug(req.method, req.url);
  next();
});

// static files
app.use(express.static('assets/dist'));

// app index
app.get('/', function(req, res) {
  debug('serving index');
  res.render('index');
});

// 404
app.use(function(req, res, next){
  res.status(404).send({ error: 'Not found' });
});

controller(sockio);

// start
server.listen(config.port, function() {
  debug('server listening on', config.port);
});
