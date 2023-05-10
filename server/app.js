const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json({type: 'application/json'}))


app.use(express.static('client/public'));

app.get('/', function (req, res) {
res.sendFile('index.html', {root: './client/views' })
})

// database connection
const db = require( "./db/connection" );

app.get('/home', function (req, res) {
// check for the index cookie!
var cookies = req.headers.cookie;
var flag = false;
if(cookies) { 
    cookies.split(';').forEach(function(cookie) {
        var parts = cookie.split('=');
        cookieName = parts[0].trim();
        if(cookieName == 'index') {
            flag = true;
            var index = parts[1];
            console.log("logging in index " + index)
            if(index >= 0) {
                res.sendFile('home.html', {root: './client/views' })
            }
            else {
                res.sendFile('notAuth.html', {root: './client/views' })
            }
        }
    });
}
if(!flag) {
    res.sendFile('notAuth.html', {root: './client/views' })
}
// set cookie res.cookie("index", value);
// set cookie with time cookies.set('testtoken', {maxAge: Date.now() + AUTH_TIMEOUT});
// delete cookie res.clearCookie("index");


})

app.get('/sign-up', function (req, res) {
res.sendFile('sign-up.html', {root: './client/views' })
})

// Include the userRoutes module
let userRoutes = require('./route/userRoutes');
app.use('/api/user', userRoutes);

// Include the userRoutes module
let postRoutes = require('./route/postRoutes');
app.use('/api/post', postRoutes);


app.listen(1337, () => console.log('Flaunt-It Chatter listening on port 1337!'));
