var http = require('http');
var gutil = require('gulp-util');
var Trello = require("node-trello");
var Router = require('node-simple-router');
var fs = require('fs');

var router = new Router();

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json'));

if (config.trello.key && config.trello.token) {
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

var server = http.createServer(router);
server.listen(8081, function(err) {
  if (err) {
    throw err;
  }

  gutil.log('Server listening on port: 8081');
});