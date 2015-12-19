var express = require('express');
var route = express.Router();
var comments = require('./comments')
module.exports = route;
var dbAccess = require('../dbConnection/pgController');


//crud routes
route.use('/:id', function(req, res, next) {
  req.blogPostId = req.params.id;
  next();
})

route.use('/:id/comments', comments());

route.post ('/', function(req, res){
  dbAccess.posts.create(req.body.title, req.body.userId, req.body.body)
  .then (function(){
    res.json ({
      success: true
    })
  })
  .catch (function(err){
    console.log(err)
    res.json ({
      success: false
    })
  })
})

route.get ('/:id', function(req,res){
  var id = req.params.id
  dbAccess.posts.readOne(id)
  .then (function(post){
    res.json(post.rows)
  })
  .catch (function(err){
    console.log(err)
    res.json ({
      success: false
    })
  })
})

route.get ('/', function(req, res){
  dbAccess.posts.readAll()
  .then (function(posts){
    res.json(posts.rows)
  })
  .catch (function(err){
    console.log(err)
    res.json ({
      success: false
    })
  })
})

route.put ('/:id', function(req, res){
  var id = req.params.id
  var userId = req.body.userId || '0';
  dbAccess.posts.update(req.body.title, req.body.body, id, userId)
  .then (function(){
    res.json ({
      success: true
    })
  })
  .catch (function(err){
    console.log(err)
    res.json({
      success: false
    })
  })
})

route['delete']('/:id', function(req, res){
  var id = req.params.id;
  var userId = req.body.userId;
  dbAccess.posts['delete'](id, userId)
  .then (function(){
    res.json ({
      success: true
    })
  })
  .catch (function(err){
    console.log(err);
    res.json({
      success: false
    })
  })
})
