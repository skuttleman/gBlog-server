var express = require('express');
var  app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var posts = require('./routes/posts');
var comments = require('./routes/comments');

app.use('/posts', posts);
app.use('/comments', comments);



app.listen (4200, function(){
  console.log('listening on port 4200');
})
