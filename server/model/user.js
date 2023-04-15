// output to the log that the module is loaded successfully!
console.log("[user] initialized");

// output to the log that the module is loaded successfully!
console.log("[userService] initialized");

class User {
    constructor (firstName, lastName, email, username, password, emailValidated) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
    this.emailValidated = emailValidated;
    }
}

exports.createUser = function( firstName, lastName, email, username, password, emailValidated ) {
    return new User( firstName, lastName, email, username, password, emailValidated );
}