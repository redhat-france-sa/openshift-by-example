var express = require('express')
var proxy = require('express-http-proxy');
var app = express()

app.set('port', (process.env.PORT || 8081))
app.use(express.static(__dirname + '/dist'))

var backend_service = process.env.BACKEND_SERVICE || undefined
if (backend_service == undefined) {
  console.error("CONFIG ERROR: Can't find backend service config! \nDefine `BACKEND_SERVICE` env variable.")
} else {
  console.info("Backend service defined at `" + backend_service + "`. Proxying all request to /api/*")
  app.use('/api', proxy(backend_service, {
    proxyReqPathResolver: function (req) {
      return '/api' + req.url
    }})
  );
}

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})