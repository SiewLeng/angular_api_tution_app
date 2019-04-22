const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const student = require('./routes/student.route');
const teacher = require('./routes/teacher.route');
const group = require('./routes/class.route');

const app = express();

const mongoose = require ('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017/TutionClass';
mongoose.connect(mongoDB);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/students', student);
app.use('/teachers', teacher);
app.use('/classes', group);
app.use('/', function(req, res){
    res.send("Hello World");
});

let port = 3000;
app.listen(port, ()=>{
    console.log('Sever is up and running on port number' + port);
})