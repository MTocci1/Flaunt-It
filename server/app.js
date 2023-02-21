const express = require('express');
const app = express();

app.use(express.static('client/public'));

app.get('/', function (req, res) {
res.sendFile('index.html', {root: './client/views' })
})

app.listen(1337, () => console.log('Marist Chatter listening on port 1337!'));
