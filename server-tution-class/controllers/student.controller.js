const JSON = require('circular-json');
const uuid = require('uuid');
const Student = require('../models/student.model');

exports.home = function (req, res) {
    Student.find(
        {},
        function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                var listOfStudent = result;
                res.json(listOfStudent);
            }
        }
    );
}

exports.create = function (req, res) {
    //res.send(JSON.stringify(req));
    let name = req.body.name;
    let age = req.body.age;
    Student.create(
        {   'id': uuid(),
            'name': name,
            'age': age
        },
        function(err, result){
            if (err) console.log(err);
            else res.json(result);
        }
    )
}

exports.find = function (req, res) {
    let id = req.params.id;
    Student.find(
        {id: id},
        function(err, result) {
            var student;
            if (err) console.log(err);
            else {
                student = result[0];
                res.json(student);
            }
        }
    )
}

exports.update = function (req, res) {
    let id = req.body.id;
    let name = req.body.name;
    let age = req.body.age;
    Student.findOneAndUpdate(
        {'id': id},
        {$set:
            {
                name: name,
                age: age,
            }
        },
        function(err, result) {
            if (err) console.log(err);
            else res.json(result);
        }
    );
}

exports.delete = function (req, res) {
    //res.send(JSON.stringify(req));
    let id = req.params.id;
    Student.findOneAndRemove(
        {'id': id},
        function(err, result) {
            if (err) console.log(err);
            else res.json(result);
        }
    );
}