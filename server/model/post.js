// output to the log that the module is loaded successfully!
console.log("[post] initialized");

// output to the log that the module is loaded successfully!
console.log("[postService] initialized");

class Post {
    constructor (postID, username, profilePic, text, image, likes, comments) {
    this.postID = postID;
    this.username = username;
    this.profilePic = profilePic;
    this.text = text;
    this.image = image;
    this.likes = likes;
    this.comments = comments;
    }
}

exports.createPost = function( postID, username, profilePic, text, image, likes, comments ) {
    return new Post( postID, username, profilePic, text, image, likes, comments );
}