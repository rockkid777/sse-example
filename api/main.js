var express = require('express');
var bodyParser = require('body-parser');
var nats = require('nats');

var servicePort = process.env.PORT || 8080;
var natsUrl = process.env.NATS || "nats://localhost:4222";
var natsUser = process.env.NATSUSER || "user";
var natsPass = process.env.NATSPASS || "pass";
var topic = (process.env.TOPIC || 'test');

function app_init(nc) {
  var app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.post('/msgRequest', function(req, res) {
    var msg = req.body.text;
    var author = req.body.author;
    nc.publish(topic, {
      'type': 'message'
      , 'message': {
        'text': msg
        , 'author': author
      }
    });
    res.status(204).send('');
  });

  app.listen(servicePort);
}

var nc = nats.connect({
  'url': natsUrl
  , 'user': natsUser
  , 'pass': natsPass
  , 'json': true
});

nc.on('connect', app_init.bind(nc));

nc.on('error', function(error) {
  console.log('error', error);
});
