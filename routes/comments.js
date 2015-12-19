var express = require('express');
var route = express.Router();
var dbAccess = require('../dbConnection/pgController');

module.exports = function (post_id) {
//crud routes
route.post ('/', function(req, res) {
  dbAccess.comments.create(post_id, req.body.user_id, req.body.body)
  .then (function() {
    res.json({
      success: true
    })
  })
  .catch (function(err) {
    console.log(err);
    res.json ({
      success: false
    })
  })
})

// individual comment
route.get ('/:id', function () {
  var id = req.params.id
  dbAccess.comments.readOne(id)
  .then (function(post) {
    res.json(post.rows)
  })
  .catch (function(err) {
    console.log(err)
    res.json ({
      success: false
    })
  })
})

// post comments
route.get ('/', function (req, res) {
  dbAccess.comments.readAll(post_id)
  .then (function(posts) {
    res.json(posts.rows)
  })
  .catch (function(err) {
    console.log(err)
    res.json({
      success:false
    })
  })
})

route.put ('/:id', function(req,res) {
  var id = req.params.id;
  var userID = req.body.userID || '0';
  dbAccess.comments.update(req.body.body, id, userId)
  .then(function() {
    res.json ({
      success: true
    })
  })
  .catch (function(err) {
    console.log(err)
    res.json({
      success: false
    })
  })
})

route['delete']('/:id', function(req, res) {
  var id = req.params.id;
  var userId = req.body.userId;
  dbAccess.posts['delete'](id, userId)
  .then (function(){
    res.json({
      success: true
    })
  })
  .catch (function(err) {
    console.log(err);
    res.json({
      success: false
    })
  })
})

return route;
};
