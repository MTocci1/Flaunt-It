// output to the log that the module is loaded successfully!
console.log("[userController] initialized");

// output to the log that the module is loaded successfully!
console.log("[userService] initialized");

// Include the user module
let User = require('../model/user');

// create an array to hold the created users
let users = [];

// create a user
let pyroburd = User.createUser("Mason", "Tocci", "toasty@gmail.com", "toaster", "password1", true);

// add the user to the array
users.push(pyroburd);

// create a user
let patarboss = User.createUser("John", "Doe", "doe@gmail.com", "doeman", "password2", true);

// add the user to the array
users.push(patarboss);

// create a user
let kaz = User.createUser("Steve", "Williams", "swilly@gmail.com", "swilly", "password3", true);

// add the user to the array
users.push(kaz);

// create a user
let mildwater = User.createUser("andrew", "frosk", "mildwater@gmail.com", "frosker", "password4", true);

// add the user to the array
users.push(mildwater);

// send entire users array as the body of the response as json
exports.getAllUsers = ( req, res ) => {
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( users );
    }

// retrieve the user in the :index parameter of the request and return as json
exports.getUser = ( req, res ) => {
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( users[ req.params.index ] );
}

// save a user
exports.saveUser = ( req, res ) => {
    console.log("debugging " + req.body);
    let newUser = User.createUser( req.body.firstName, req.body.lastName, req.body.email, req.body.username, 
        req.body.password, req.body.emailValidated );
    users.push( newUser );
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( users );
}

exports.deleteUser = function(req, res) {
    users.splice(req.params.index, 1);
    res.setHeader('Content-Type', 'application/json');
    res.send(users);
}

exports.updateUserPartial = function(req, res) {
    // get the existing user from the array
    var updatedUser = users[req.params.index];
    // check to see what has been passed and update the local copy
    if(req.body.firstName)
    updatedUser.firstName = req.body.firstName;
    if(req.body.lastName)
    updatedUser.lastName = req.body.lastName;
    if(req.body.email)
    updatedUser.email = req.body.email;
    if(req.body.username)
    updatedUser.username = req.body.username;
    if(req.body.password)
    updatedUser.password = req.body.password;
    // save the local copy of the user back into the array
    users[req.params.index] = updatedUser;
    res.setHeader('Content-Type', 'application/json');
    res.send(users[req.params.index]);
}

exports.updateUser = function(req, res) {
    // get the existing user from the array
    var updatedUser = users[req.params.index];
    // completely update the local copy
    if(req.body)
    updatedUser = req.body;
    // save the local copy of the user back into the array
    users[req.params.index] = updatedUser;
    res.setHeader('Content-Type', 'application/json');
    res.send(users[req.params.index]);
}