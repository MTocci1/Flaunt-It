// output to the log that the module is loaded successfully!
console.log("[userController] initialized");

// output to the log that the module is loaded successfully!
console.log("[userService] initialized");

// Include the user module
let User = require('../model/user');

// Include the userService module
let userService = require('../service/userService');

// create an array to hold the created users
let users = [];

// create a user
let pyroburd = User.createUser(0, "Mason", "Tocci", "toasty@gmail.com", "toaster", "toaster.jpg", "password1", true);

// add the user to the array
users.push(pyroburd);

// create a user
let patarboss = User.createUser(1, "John", "Doe", "doe@gmail.com", "doeman", "default.jpg", "password2", true);

// add the user to the array
users.push(patarboss);

// create a user
let kaz = User.createUser(2, "Steve", "Williams", "swilly@gmail.com", "swilly", "swilly.png", "password3", true);

// add the user to the array
users.push(kaz);

// create a user
let mildwater = User.createUser(3, "andrew", "frosk", "mildwater@gmail.com", "frosker", "default.jpg", "password4", true);

// add the user to the array
users.push(mildwater);

// send entire users array as the body of the response as json
exports.getAllUsers = ( req, res ) => {
    res.setHeader( 'Content-Type', 'application/json' );
    //get all users from the database
    userService.getUsers((users_list) => {
    users = users_list;
    res.send(users_list);
  });
};

// retrieve the user in the :index parameter of the request and return as json
exports.getUser = ( req, res ) => {
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( users[ req.params.index ] );
}

// save a user
exports.saveUser = ( req, res ) => {
    let newUser = User.createUser( req.body.userID, req.body.firstName, req.body.lastName, req.body.email, req.body.username, req.body.profilePic,
        req.body.password, req.body.emailValidated );
    users.push( newUser );
    //save user in database
    userService.saveUser(req, res);
    }

exports.deleteUser = function(req, res) {
    users.splice(req.params.index, 1);
    //delete user in database
    userService.deleteUser(req, res);
}

exports.updateUserPartial = function(req, res) {
    // get the existing user from the array
    var updatedUser = users[req.params.index];
    // check to see what has been passed and update the local copy
    if(req.body.userID)
        updatedUser.userID = req.body.userID;
    if(req.body.firstName)
        updatedUser.firstName = req.body.firstName;
    if(req.body.lastName)
        updatedUser.lastName = req.body.lastName;
    if(req.body.email)
        updatedUser.email = req.body.email;
    if(req.body.username)
        updatedUser.username = req.body.username;
    if(req.body.profilePic)
        updatedUser.profilePic = req.body.profilePic;
    if(req.body.password)
        updatedUser.password = req.body.password;
    // save the local copy of the user back into the array
    users[req.params.index] = updatedUser;
    //update user in database
    userService.updateUserPartial(req, res, updatedUser);
}

exports.updateUser = function(req, res) {
    // get the existing user from the array
    var updatedUser = users[req.params.index];
    // completely update the local copy
    if(req.body)
    updatedUser = req.body;
    // save the local copy of the user back into the array
    users[req.params.index] = updatedUser;
    //update user in database
    userService.updateUser(req, res, updatedUser);
}