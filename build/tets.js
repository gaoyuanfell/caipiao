var express = require('express')
var app = express();
var https = require('https');
var fs = require('fs');
var privateKey  = fs.readFileSync('../static/cert.pem');
var certificate = fs.readFileSync('../static/cert.crt');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);