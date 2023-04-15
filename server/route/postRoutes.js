// output to the log that the module is loaded successfully!
console.log("[postRoutes] initialized");

// Include the postController module
let postController = require('../controller/postController');

// require the express library
var express = require('express');
// create chainable route handlers for a path by using app.route()
// see https://expressjs.com/en/guide/routing.html
var router = express.Router();

// all posts routes
router.route('/')
    .get( ( req, res ) => {
    postController.getAllPosts( req, res );
    })
    .post( ( req, res ) => {
    postController.savePost( req, res );
    }
);

// post by array index route
router.route('/:index')
    .get( ( req, res ) => {
    postController.getPost( req, res );
    })
    .delete( (req, res ) => {
    postController.deletePost( req, res );
    })
    .patch( (req, res ) => {
    postController.updatePostPartial( req, res );
    })
    .put( (req, res ) => {
    postController.updatePost( req, res );
    }
);


module.exports = router;
