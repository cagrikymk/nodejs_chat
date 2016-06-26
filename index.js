var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var session = require('express-session');

var sess;

app.use(session({secret: 'my-super-chat'}));
app.get('/', function(req, res){
  if(sess == null)
    sess = req.session;
  if(sess.nickname != null) {
    res.sendFile(__dirname + '/index.html');
    console.log(sess.nickname);
  }

  else
    res.sendFile(__dirname + '/index.html');

  console.log(sess.nickname == null);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('nick-thing', function(msg) {
    sess.nickname = msg;
    console.log(sess.nickname);
  	socket.emit('nick-thing', msg);
  });
});

http.listen(80, function(){
  console.log('listening on *:3000');
});