// Include the postController module
let postController = require('../controller/postController');

// Include the post module
let post = require('../model/post');

// database connection
const db = require( '../db/connection' );


exports.getPosts = function(callback) {
    const posts_list = [];
  
    const sql = 'SELECT * FROM posts';
    db.query(sql, (err, result) => {
      if (err) throw err;
      
      //iterate through each row of the database
      for (let i = 0; i < result.rows.length; i++) {
        posts_list.push(post.createPost(result.rows[i].postid, result.rows[i].username, result.rows[i].profilepic, result.rows[i].post_text, 
          result.rows[i].post_image, result.rows[i].likes, result.rows[i].comments));
      }
      console.log( posts_list );
      callback(posts_list);
    });
  }
  
  exports.savePost = function(req, res, newPost) {
    console.log("Saving post...");
    const sql = `INSERT INTO posts (postID, username, profilePic, post_text, post_image, likes, comments) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const values = [newPost.postID, newPost.username, newPost.profilePic, newPost.text, newPost.image, newPost.likes,
        newPost.comments];
  
    db.query(sql, values)
      .then(result => {
        console.log("Post saved!");
        res.setHeader("Content-Type", "application/json");
        res.send(result);
        res.end();
      })
      .catch(err => {
        console.log("Error saving post:", err);
        res.status(500).send("Error saving post");
        res.end();
      });
  };
  
  exports.deletePost = function(req, res) {
    console.log(`Deleting post with index ${req.params.index}...`);
    const sql = "DELETE FROM posts WHERE postID = $1";
    const values = [req.params.index];
  
    db.query(sql, values)
      .then(result => {
        console.log("Post deleted!");
        res.setHeader("Content-Type", "application/json");
        res.send(result);
        res.end();
      })
      .catch(err => {
        console.log("Error deleting post:", err);
        res.status(500).send("Error deleting post");
        res.end();
      });
  };

  exports.updatePost = function(req, res, updatedPost) {
    console.log(`Updating post with index ${updatedPost.postID}...`);
    const sql = `UPDATE posts SET username = $1, profilePic = $2, post_text = $3, post_image = $4, likes = $5, comments = $6 
        WHERE postID = $7`;
    const values = [updatedPost.username, updatedPost.profilePic, updatedPost.text, updatedPost.image, updatedPost.likes, 
      updatedPost.comments, updatedPost.postID];
  
    db.query(sql, values)
      .then(result => {
        console.log("Post updated!");
        res.setHeader("Content-Type", "application/json");
        res.send(result);
        res.end();
      })
      .catch(err => {
        console.log("Error updating post:", err);
        res.status(500).send("Error updating post");
        res.end();
      });
  };

  exports.updatePostPartial = function(req, res, updatedPost) {
    console.log(`Updating post with index ${updatedPost.postID}...`);
  
    const setClause = [];
    const values = [];
    if (updatedPost.username) {
      setClause.push(`username = $${values.length + 1}`);
      values.push(updatedPost.username);
    }
    if (updatedPost.profilePic) {
      setClause.push(`profilePic = $${values.length + 1}`);
      values.push(updatedPost.profilePic);
    }
    if (updatedPost.text) {
      setClause.push(`post_text = $${values.length + 1}`);
      values.push(updatedPost.text);
    }
    if (updatedPost.image) {
      setClause.push(`post_image = $${values.length + 1}`);
      values.push(updatedPost.image);
    }
    if (updatedPost.likes) {
      setClause.push(`likes = $${values.length + 1}`);
      values.push(updatedPost.likes);
    }
    if (updatedPost.comments) {
      setClause.push(`comments = $${values.length + 1}`);
      values.push(updatedPost.comments);
    }
  
    if (setClause.length === 0) {
      // No fields to update
      console.log("No fields to update");
      res.setHeader("Content-Type", "application/json");
      res.send({ message: "No fields to update" });
      res.end();
      return;
    }
  
    const sql = `UPDATE posts SET ${setClause.join(", ")} WHERE postID = $${values.length + 1}`;
    values.push(updatedPost.postID);
  
    db.query(sql, values)
      .then(result => {
        console.log("Post updated!");
        res.setHeader("Content-Type", "application/json");
        res.send(result);
        res.end();
      })
      .catch(err => {
        console.log("Error updating post:", err);
        res.status(500).send("Error updating post");
        res.end();
      });
  };

  