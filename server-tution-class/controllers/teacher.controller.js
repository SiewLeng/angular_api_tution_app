const JSON = require('circular-json');
const Teacher = require('../models/teacher.model');
const uuid = require('uuid');

exports.home = function (req, res) {
    Teacher.find({}, (err, result) => {
        if (err) console.log(err);
        else res.json(result);
    });
}

exports.create = function (req, res) {
    //console.log(JSON.stringify(req.body));
    var id = uuid();
    var name = req.body.name;
    var age = req.body.age;
    var subject = req.body.subject;

    Teacher.create(
        {
            'name': name,
            'age': age,
            'subject': subject,
            'id': id
        },
        function (err, result) {
            if (err) console.log(err);
            else res.json(result);
        }
    )
}

exports.find = function (req, res) {
    //console.log(JSON.stringify(req));
    let id = req.params.id;
    Teacher.find(
        {'id': id},
        function(err, result) {
            if (err) console.log(err);
            else res.json(result[0]);
        }
    );
}

exports.update = function (req, res) {
    //console.log(JSON.stringify(req));
    let id = req.body.id;
    let name = req.body.name;
    let age = req.body.age;
    let subject = req.body.subject;
    let query = {'id': id};

    Teacher.findOneAndUpdate(
        query,
        {$set:
            {
                'name': name,
                'age': age,
                'subject': subject
            }
        },
        function (err, result) {
            if (err) console.log(error);
            else res.json(result);
        }
    )
}

exports.delete = function (req, res) {
    //console.log(JSON.stringify(req));
    let id = req.params.id;
    let query = {'id': id};

    Teacher.findOneAndDelete(
        query,
        function (err, result) {
            if (err) (console.log(err));
            else res.json(result);
        }
    );
}