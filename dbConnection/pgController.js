var pg = require('pg');
var connection = 'postgres://localhost/gblog';


function runSQL (query, params) {
  return new Promise (function (resolve, reject){
    pg.connect(connection, function(err, client, done){
      if (err){
        done();
        reject(err);
        return
      };
      client.query(query, params, function(err, results){
        done();
        if (err){
          reject(err);
          return
        }
        resolve(results);
      })
    })
  });
}

module.exports = {
  posts: {
    create: function(title, userId, body){
      var dateTime = new Date();
      var sql = 'insert into posts(title, user_id, body, creation_time) values ($1, $2, $3, $4);';
      return runSQL(sql, [title, userId, body, dateTime]);
    },
    readOne: function(id){
      var sql = 'SELECT * FROM posts WHERE id = $1 ORDER BY creation_time DESC;';
      return runSQL(sql, [id]);
    },
    readAll: function(){
      var sql = 'SELECT * FROM posts ORDER BY creation_time DESC;';
      return runSQL(sql);
    },
    update: function(title, body, id, userId){
      return runSQL('SELECT * FROM posts WHERE id=$1', [id])
      .then(function(post) {
        if (post.rows[0].user_id == userId) {
          var promises = []
          if (title) {
            var sql = 'UPDATE posts SET title = $1 WHERE id = $2;';
            promises.push(runSQL(sql, [title, id]));
          }
          if (body) {
            sql = 'UPDATE posts SET body = $1 WHERE id = $2;';
            promises.push(runSQL(sql, [body, id]));
          }
          return Promise.all(promises);
        } else {
          return Promise.reject('User Id does not match');
        }
      }).catch(function(err) {
        return Promise.reject(err);
      });

    },
    'delete': function(id, userId){
      return runSQL('SELECT * FROM posts WHERE id=$1', [id])
      .then(function(post) {
        if (post.rows[0].user_id == userId) {
          var sql = 'DELETE FROM posts WHERE id = $1;'
          return runSQL(sql, [id]);
        }
        else return Promise.reject('User Id does not match');
      })
      .catch(function(err) {
        return Promise.reject(err);
      });
    }
  },
  comments: {
    create: function(postId, userId, body) {
      if (userId) {
        var dateTime = new Date();
        var sql = 'INSERT INTO comments (post_id, user_id, body, creation_time) values ' +
        '($1, $2, $3, $4);';
        return runSQL(sql, [postId, userId, body, dateTime]);
      } else {
        return Promise.reject('No User ID');
      }

    },
    readOne: function(id) {
      var sql = 'SELECT * FROM comments WHERE id = $1 ORDER BY creation_time DESC;';
      return runSQL(sql, [id]);
    },
    readAll: function(postId) {
      var sql = 'SELECT * FROM comments WHERE post_id = $1 ORDER BY creation_time DESC;';
      return runSQL(sql, [postId]);
    },
    update: function(body, postId, userId) {
      return runSQL('SELECT * FROM comments WHERE id = $1;', [postId])
      .then(function(comment) {
        if (userId == comment.rows[0].user_id) {
          var sql = 'UPDATE comments SET body=$1 WHERE id=$2;';
          return runSQL(sql, [body, postId]);
        } else {
          return Promise.reject('User Id does not match');
        }
      })
      .catch(function(err) {
        return Promise.reject(err);
      })
    },
    'delete': function(id, userId) {
      // console.log(id, userId);
      return runSQL('SELECT * FROM comments WHERE id = $1', [id])
      .then(function(comment) {
        if (comment.rows[0].user_id == userId) {
          var sql = 'DELETE FROM comments WHERE id = $1;';
          return runSQL(sql, [id]);
        } else {
          return Promise.reject('User Id does not match');
        }
      })
      .catch(function(err) {
        return Promise.reject(err);
      })
    }
  }
}
