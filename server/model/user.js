// output to the log that the module is loaded successfully!
console.log("[user] initialized");

// output to the log that the module is loaded successfully!
console.log("[userService] initialized");

class User {
    constructor (userID, firstName, lastName, email, username, profilePic, password, emailValidated) {
    this.userID = userID
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.profilePic = profilePic;
    this.password = password;
    this.emailValidated = emailValidated;
    }
}

exports.createUser = function( userID, firstName, lastName, email, username, profilePic, password, emailValidated ) {
    return new User( userID, firstName, lastName, email, username, profilePic, password, emailValidated );
}