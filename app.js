var express = require('express');
var  app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

var posts = require('./routes/posts');

app.use('/posts', posts);



app.listen (4200, function(){
  console.log('listening on port 4200');
})
