var express = require('express');
var route = express.Router();
module.exports = route;
var dbAccess = require('../dbConnection/pgController');


//crud routes
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
    res.json(post)
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
    res.json(posts)
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
  dbAccess.posts.update(req.body.title, req.body.body, id)
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

route.delete ('/:id', function(req, res){
  var id = req.params.id
  dbAccess.post.delete(id)
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
