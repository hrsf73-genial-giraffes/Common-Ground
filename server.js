var express = require('express')
// Added to serve static files
var path = require('path')
var app = express()
var yelp = require('./yelpHelper')
var gDirections = require('./gDirections')

var port = process.env.PORT || 8080;

// Added to serve static files out of htmlTemplates
app.use('/htmlTemplates', express.static(path.join(__dirname, '/htmlTemplates')));
app.use('/server', express.static(path.join(__dirname, '/server')));
app.use('/config', express.static(path.join(__dirname, '/config')));

app.get('/', function (req, res) {
  res.send('Hello Matt The Man!')
})

app.get('/directions', function(req, res){

  //get with dummy data
  gDirections.getDirections({
    origin: '944 Market St, San Francisco, CA 94102',
    destination: '25 Pearl St, San Francisco, CA 94103', 
    mode: 'transit'
  }, function(data){
    res.send(data);
  })
})

app.get('/yelp', function (req, res) {

  //fetch with dummy data
  yelp.fetchBusinesses({
        "latitude": 37.7776799,
        "longitude": -122.40709,
        "radius": 1000
      }, function(data) {
    res.send(data);
  });

});

app.get('/map', function(req, res) {
  res.send('../htmlTemplates/map.html');
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})