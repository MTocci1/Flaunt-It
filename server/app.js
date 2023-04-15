const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json({type: 'application/json'}))


app.use(express.static('client/public'));

app.get('/', function (req, res) {
res.sendFile('index.html', {root: './client/views' })
})

app.get('/home', function (req, res) {
res.sendFile('home.html', {root: './client/views' })
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


app.listen(1337, () => console.log('Marist Chatter listening on port 1337!'));
