//redirect to page

const login = document.getElementById('log-in');
login.addEventListener('click', redirectToHome);

const logInGoogle = document.getElementById('log-in-google');
logInGoogle.addEventListener('click', redirectToHome);

function redirectToHome() {
  window.location.href = 'http://localhost:1337/home';
}

//lists all existing users on the log in page
function getAllUsers() {
  fetch('/api/user').then(function(response) {
      if (response.status !== 200) {
          console.log('problem with ajax call! ' + response.status + " msg: " + response.value);
          return;
      }
      response.json().then(function(data) {  
    var userHtml ="<ol>";
          for(i in data) {
            userHtml += "<li id='" + data[i].userID + "'>" + data[i].firstName + "," + data[i].lastName + "," + data[i].email + "," 
            + data[i].username + "," + data[i].password + "," + data[i].emailValidated + "</li>";
          }  
    userHtml += "</ol>";
    document.getElementById('users').innerHTML = userHtml;
      });
  });
}

function logIn(index) {
// set the cookie!
var now = new Date();
var EXPIRE_TIME = 60000; // 60 seconds
now.setTime(now.getTime() + EXPIRE_TIME);
document.cookie = "index=" + index +";expires=" 
  + now.toUTCString() + ";";
  window.location='/home';
}

getAllUsers();

function userClick() {
var targetElement = event.target || event.srcElement;
logIn(targetElement.id);
}

var usersEl = document.getElementById('users');
usersEl.addEventListener("click", userClick)