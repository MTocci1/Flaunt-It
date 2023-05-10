// Include the userController module
let userController = require('../controller/userController');

// Include the user module
let user = require('../model/user');

// database connection
const db = require( '../db/connection' );


exports.getUsers = function(callback) {
    const users_list = [];
  
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
      if (err) throw err;
      
      //iterate through each row of the database
      for (let i = 0; i < result.rows.length; i++) {
        users_list.push(user.createUser(result.rows[i].userid, result.rows[i].firstname, result.rows[i].lastname, result.rows[i].email, 
          result.rows[i].username, result.rows[i].profilepic, result.rows[i].user_password, result.rows[i].emailvalidated));
      }
      console.log( users_list );
      callback(users_list);
    });
  }
  
  exports.saveUser = function(req, res) {
    console.log("Saving user...");
    const sql = `INSERT INTO users (userID, firstName, lastName, email, username, profilePic, user_password, emailValidated) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [req.body.userID, req.body.firstName, req.body.lastName, req.body.email, req.body.username, req.body.profilePic,
      req.body.password, req.body.emailValidated];
  
    db.query(sql, values)
      .then(result => {
        console.log("User saved!");
        res.setHeader("Content-Type", "application/json");
        res.send(result);
        res.end();
      })
      .catch(err => {
        console.log("Error saving user:", err);
        res.status(500).send("Error saving user");
        res.end();
      });
  };
  
  exports.deleteUser = function(req, res) {
    console.log(`Deleting user with index ${req.params.index}...`);
    const sql = "DELETE FROM users WHERE userID = $1";
    const values = [req.params.index];
  
    db.query(sql, values)
      .then(result => {
        console.log("User deleted!");
        res.setHeader("Content-Type", "application/json");
        res.send(result);
        res.end();
      })
      .catch(err => {
        console.log("Error deleting user:", err);
        res.status(500).send("Error deleting user");
        res.end();
      });
  };

  //update every field
  exports.updateUser = function(req, res, updatedUser) {
    console.log(`Updating user with index ${updatedUser.userID}...`);
    const sql = `UPDATE users SET firstName = $1, lastName = $2, email = $3, username = $4, profilePic = $5, user_password = $6, 
      emailValidated = $7 WHERE userID = $8`;
    const values = [updatedUser.firstName, updatedUser.lastName, updatedUser.email, updatedUser.username, updatedUser.profilePic, 
      updatedUser.password, updatedUser.emailValidated, updatedUser.userID];
  
    db.query(sql, values)
      .then(result => {
        console.log("User updated!");
        res.setHeader("Content-Type", "application/json");
        res.send(result);
        res.end();
      })
      .catch(err => {
        console.log("Error updating user:", err);
        res.status(500).send("Error updating user");
        res.end();
      });
  };

  //update only the necessary fields
  exports.updateUserPartial = function(req, res, updatedUser) {
    console.log(`Updating user with index ${updatedUser.userID}...`);
  
    const setClause = [];
    const values = [];
    if (updatedUser.firstName) {
      setClause.push(`firstName = $${values.length + 1}`);
      values.push(updatedUser.firstName);
    }
    if (updatedUser.lastName) {
      setClause.push(`lastName = $${values.length + 1}`);
      values.push(updatedUser.lastName);
    }
    if (updatedUser.email) {
      setClause.push(`email = $${values.length + 1}`);
      values.push(updatedUser.email);
    }
    if (updatedUser.username) {
      setClause.push(`username = $${values.length + 1}`);
      values.push(updatedUser.username);
    }
    if (updatedUser.profilePic) {
      setClause.push(`profilePic = $${values.length + 1}`);
      values.push(updatedUser.profilePic);
    }
    if (updatedUser.password) {
      setClause.push(`user_password = $${values.length + 1}`);
      values.push(updatedUser.password);
    }
    if (updatedUser.emailValidated) {
      setClause.push(`emailValidated = $${values.length + 1}`);
      values.push(updatedUser.emailValidated);
    }
  
    if (setClause.length === 0) {
      // No fields to update
      console.log("No fields to update");
      res.setHeader("Content-Type", "application/json");
      res.send({ message: "No fields to update" });
      res.end(); // Close the response
      return;
    }
  
    const sql = `UPDATE users SET ${setClause.join(", ")} WHERE userID = $${values.length + 1}`;
    values.push(updatedUser.userID);
  
    db.query(sql, values)
      .then(result => {
        console.log("User updated!");
        res.setHeader("Content-Type", "application/json");
        res.send(result);
        res.end(); // Close the response
      })
      .catch(err => {
        console.log("Error updating user:", err);
        res.status(500).send("Error updating user");
        res.end(); // Close the response
      });
  };