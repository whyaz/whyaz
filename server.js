var http = require('http');
var gutil = require('gulp-util');
var Trello = require("node-trello");
var Router = require('node-simple-router');

var router = new Router();

if (process.env.TRELLO_KEY && process.env.TRELLO_TOKEN) {
  var trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);

  var LIST_ID = '543c0882444aff50f199ecef';

  router.post('/send-message', function (req, res) {

    trello.post('/1/cards', {
      name: 'Message from ' + (req.body.name || req.body.email || req.body.twitter),
      pos: 'top',
      desc: '**Name:** ' + req.body.name + '\r\n**Email:** ' + req.body.email + '\r\n**Twitter:** ' + req.body.twitter + '\r\n**Message:**\r\n\r\n' + req.body.message,
      idList: LIST_ID,
      urlSource: null
    }, function (err, data) {
      if (err) gutil.log(err);
      res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
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