var http = require('http');
var https = require('https');
var gutil = require('gulp-util');
var Trello = require("node-trello");
var Router = require('node-simple-router');
var fs = require('fs');

var router = new Router();

var config = fs.readFile(__dirname + '/config.json', function(err, data){
  if (err){
    return undefined;
  }
  return JSON.parse(data);
});

if (config && (config.trello.key && config.trello.token)) {
  var trello = new Trello(config.trello.key, config.trello.token);

  router.post('/send-message', function (req, res) {

    trello.post('/1/cards', {
      name: 'Message from ' + (req.body.name || req.body.email || req.body.twitter),
      pos: 'top',
      desc: '**Name:** ' + req.body.name + '\r\n**Email:** ' + req.body.email + '\r\n**Twitter:** ' + req.body.twitter + '\r\n**Message:**\r\n\r\n' + req.body.message,
      idList: config.trello.list,
      urlSource: null
    }, function (err, data) {
      if (err) gutil.log(err);
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end();
    });
  });
}

router.get('/github/contributors', function(request, response){
  //TODO: May want to get an api key and add to config.json
  var body = '';
  var options = {
    hostname: 'api.github.com',
    path: '/repos/meltmedia/whyaz/contributors',
    method: 'GET',
    headers: {'user-agent': 'what.az'},
  };
  var req = https.request(options, function(res) {
    res.on('data', function(d) {
      body += d;
    });
    res.on('end', function() {
      var data = JSON.parse(body)
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end(body);
    });
  });
  req.end();
});

var server = http.createServer(router);
server.listen(8081, function(err) {
  if (err) {
    throw err;
  }

  gutil.log('Server listening on port: 8081');
});