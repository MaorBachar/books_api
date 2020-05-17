var express = require("express");
var app = express();
const PORT = 5000;
const path = require("path");
var app_path = '../dist/Task';

app.use('/', express.static(path.join(__dirname, app_path)))
.get('*', (req,res)=> res.sendFile(path.join(__dirname,app_path + '/index.html')))
.listen(PORT, () => console.log(`Listening on ${PORT}`));