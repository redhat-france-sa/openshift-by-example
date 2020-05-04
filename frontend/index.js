var express = require('express')
var proxy = require('express-http-proxy');
var app = express()

app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/dist'))

var backend_service = process.env.BACKEND_SERVICE || undefined
if (backend_service == undefined) {
  console.error("CONFIG ERROR: Can't find backend service config! \nDefine `BACKEND_SERVICE` env variable.")
} else {
  console.info("Backend service defined at `" + backend_service + "`. Proxying all request to /api/fruits/*")
  app.use('/api/fruits', proxy(backend_service, {
    proxyReqPathResolver: function (req) {
      return '/api/fruits' + req.url
    }})
  );
}

var like_service = process.env.LIKE_SERVICE || undefined
if (like_service == undefined) {
  console.error("CONFIG ERROR: Can't find like service config! \nDefine `LIKE_SERVICE` env variable.")
} else {
  console.info("Like service defined at `" + like_service + "`. Proxying all request to /api/[like|unlike]/*")
  app.use('/api/like', proxy(like_service, {
    proxyReqPathResolver: function (req) {
      return '/api/like' + req.url
    }})
  );
  app.use('/api/unlike', proxy(like_service, {
    proxyReqPathResolver: function (req) {
      return '/api/unlike' + req.url
    }})
  );
}

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})