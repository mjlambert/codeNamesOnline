"use strict";
//==============================================================================
//  Modules
//==============================================================================

var express     = require('express');
var app         = express();
var server      = require('http').createServer(app);
var io          = require('socket.io')(server);
var bodyParser  = require('body-parser');

//==============================================================================
//  Server Config
//==============================================================================

app.use(bodyParser.json());

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public')); 

//==============================================================================
//  Server Routes
//==============================================================================

require('codeNamesOnline/api/routes')(app);

//==============================================================================
//  Sockets
//==============================================================================

require('codeNamesOnline/api/sockets')(io);

//==============================================================================
//  Start Server
//==============================================================================

server.listen(8080);
console.log("Server started on port 8080");
