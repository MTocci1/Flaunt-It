// output to the log that the module is loaded successfully!
console.log("[postController] initialized");

// output to the log that the module is loaded successfully!
console.log("[postService] initialized");

// Include the post module
let Post = require('../model/post');

// create an array to hold the created posts
let posts = [];

// create a post
let post1 = Post.createPost("pyroburd", "fire.png", "This movie is so good", "movie.png", 33, 2);

// add the post to the array
posts.push(post1);

// create a post
let post2 = Post.createPost("patarboss", "boss.jpg", "This song is my jam", "song.png", 12, 1);

// add the post to the array
posts.push(post2);

// create a post
let post3 = Post.createPost("kaz", "king.png", "I hate having to get up at 8am for school", null, 101, 5);

// add the post to the array
posts.push(post3);

// create a post
let post4 = Post.createPost("mildwater", "water.png", "square pizza > triangle pizza", "pizza.jpg", 54, 12);

// add the post to the array
posts.push(post4);

// send entire posts array as the body of the response as json
exports.getAllPosts = ( req, res ) => {
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( posts );
    }

// retrieve the post in the :index parameter of the request and return as json
exports.getPost = ( req, res ) => {
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( posts[ req.params.index ] );
}

// save a post
exports.savePost = ( req, res ) => {
    console.log("debugging " + req.body);
    let newPost = Post.createPost( req.body.username, req.body.profilePic, req.body.text, req.body.image, 
        req.body.likes, req.body.comments );
    posts.push( newPost );
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( posts );
}

exports.deletePost = function(req, res) {
    posts.splice(req.params.index, 1);
    res.setHeader('Content-Type', 'application/json');
    res.send(posts);
}

exports.updatePostPartial = function(req, res) {
    // get the existing post from the array
    var updatedPost = posts[req.params.index];
    // check to see what has been passed and update the local copy
    if(req.body.username)
    updatedPost.username = req.body.username;
    if(req.body.profilePic)
    updatedPost.profilePic = req.body.profilePic;
    if(req.body.text)
    updatedPost.text = req.body.text;
    if(req.body.image)
    updatedPost.image = req.body.image;
    if(req.body.likes)
    updatedPost.likes = req.body.likes;
    if(req.body.comments)
    updatedPost.comments = req.body.comments;
    // save the local copy of the post back into the array
    posts[req.params.index] = updatedPost;
    res.setHeader('Content-Type', 'application/json');
    res.send(posts[req.params.index]);
}

exports.updatePost = function(req, res) {
    // get the existing post from the array
    var updatedPost = posts[req.params.index];
    // completely update the local copy
    if(req.body)
    updatedPost = req.body;
    // save the local copy of the post back into the array
    posts[req.params.index] = updatedPost;
    res.setHeader('Content-Type', 'application/json');
    res.send(posts[req.params.index]);
}
    
    


