var level = require('level')
var embed = require("embed-video")
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes');
//var reactViews = require('express-react-views');

var youtubeId = "n8d79M0LtfY" // Youtube video ID
var db = level('./likes_db')

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//app.set('views', __dirname + '/views');
//app.set('view engine', 'jsx');
//app.engine('jsx', reactViews.createEngine());
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    var html = buildHtml(request);
    
    response.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': html.length,
    'Expires': new Date().toUTCString()
    });
    response.end(html);
});


app.get('/likes', function(request, response) {
  getLikes('like', function (err, value) {
        if (err) {
            console.log('error ' + err);
            return setLikes('like', parseInt(0,10))
        }  

        response.send(setLikes('like',(parseInt(value,10)).toString()));
    });
});

app.post('/addLike', function (req, res) {
    getLikes('like', function (err, value) {
        if (err) {
            console.log('error ' + err);
            return setLikes('like', parseInt(1,10))
    
        }  
        res.send(setLikes('like',(parseInt(value,10)+1).toString()));
    });
});

function buildHtml(req) {
  var header = '<title>Video Like Descomplica</title>';
  var body = '';
  var youtube_video = '';
  var likes = '';
  
  youtube_video = embed.youtube(youtubeId, {query: {portrait: 0, color: '333'}, attr:{width:600, height:400}});
  
  body = '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>\n';
  body = body + youtube_video + '\n<br><br>\n';
  body = body + '<span style="float: left;">Total likes:  </span>';
  body = body + '<div id="likes" style="float:left;"></div> ';
  body = body + '<div style="float:left;margin-left: 10px;"><input type="image" src="like-16.png" id="like" alt="Like video"></div>';
  //body = body + '  <input id="like" value="Like" type="button"></div></div>\n\n';
  body = body + '<script src="video_json.js"></script>\n';

  return '<!DOCTYPE html>\n'
       + '<html>\n<header>\n' + header + '</header>\n<body>\n\n' + body + '</body>\n</html>';
};

function setLikes(item, cb) {
    db.put(item, cb);
    return cb
}

function getLikes(item, cb) {
    db.get(item, cb);
};

http.createServer(app).listen(8000);
console.log('Server Running: http://127.0.0.1:8000/');