var app = require('express')();
var http = require('http').Server(app);
var body = require('body-parser');
var io = require('socket.io')(http);

app.use(body.urlencoded({extended: true}));
app.use(body.json());

app.get('/', function(req, res){
    res.status(200).send('Welcome to GPS Tracker')
});

let lat = 17.48036;
let lon = 78.41143;

app.post('/gps', function(req, res){
    lon += 0.0020 
    io.emit('position', JSON.parse(`{"lat": ${lat}, "lon" : ${lon}}`));
    console.log(req.body);
    res.send('Recieved');
});

app.get('/map', function(req, res) {
  res.sendFile(__dirname + '/map.html');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});


module.exports = app ;

