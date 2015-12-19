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
      var sql = 'SELECT * FROM posts WHERE id = $1;';
      return runSQL(sql, [id]);
    },
    readAll: function(){
      var sql = 'SELECT * FROM posts;';
      return runSQL(sql);
    },
    update: function(title, body, id){
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
    },
    delete: function(id){
      var sql = 'DELETE FROM posts WHERE id = $1;'
      return runSQL(sql, [id]);
    }
  }
}
