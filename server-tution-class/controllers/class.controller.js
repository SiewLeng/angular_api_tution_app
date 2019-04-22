const JSON = require('circular-json');
const Class = require('../models/class.model');
const Teacher = require('../models/teacher.model');
const Student = require('../models/student.model');
const uuid = require('uuid');

exports.home = function (req, res) {
    Class.aggregate([
        {
            "$lookup": {
                "from": "teachers",
                "localField" : "teacherId",
                "foreignField": "id",
                "as": "teacher_docs"
                },
            }
    ]).exec(function(err, result) {
        var listOfClass = result;
        res.json(listOfClass);
    })
}

exports.create = function (req, res) {
    //console.log(JSON.stringify(req));
    //res.send(JSON.stringify(req));
    let name = req.body.name;
    let teacherId = req.body.teacherId;
    Class.create(
        {
            id: uuid(),
            name: name,
            teacherId: teacherId,
        },
        function(err, result) {
            if (err) console.log(err);
            else res.json(result);
        }
    )
}

exports.find = function (req, res) {
    //res.send(JSON.stringify(req));
    let id = req.params.id;
    Class.find(
        {'id': id},
        function(err, result) {
            if (err) console.log(err);
            else res.json(result[0]);
        }
    )
}

exports.update = function (req, res) {
    //res.send(JSON.stringify(req));
    let name = req.body.name;
    let teacherId = req.body.teacherId;
    let id = req.body.id;
    Class.findOneAndUpdate(
        {id: id},
        {
            $set: {
                name: name,
                teacherId: teacherId
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
    Class.findOneAndRemove(
        {id: id},
        function(err, result) {
            if (err) console.log(err);
            else res.json(result);
        }
    );
}

exports.showFilteredStudent = function (req, res) {
    let id = req.params.id;
    Class.aggregate([
        {
            "$match": {"id": id}
        },

        {
            "$lookup": {
                "from": "teachers",
                "localField": "teacherId",
                "foreignField": "id",
                "as": "teacher_docs"
            }
        },
    ]).exec(function(err, result){
        var classWithTeacherInfo = result[0];
        var allStudentList;
        var filteredStudentList = [];
        function inClassStudentList(studentId) {
            var found = false;
            for (let i = 0; i < classWithTeacherInfo.listOfStudentId.length; i++) {
                if (classWithTeacherInfo.listOfStudentId[i] === studentId) {
                    found = true;
                    break;
                }
            }
            return found;
        }
        Student.find(
            {},
            function(err, result) {
                if (err) console.log(err);
                else {
                    allStudentList = result;
                    for (let i = 0; i < allStudentList.length; i++) {
                        if (!inClassStudentList(allStudentList[i].id)) {
                            filteredStudentList.push(allStudentList[i]);
                        }
                    }
                    res.json(
                        {
                            'classWithTeacherInfo': classWithTeacherInfo,
                            'filteredStudentList': filteredStudentList
                        }
                    );
                }
            }
        );
    })
}

exports.addStudent = function (req, res) {
    let id = req.params.id;
    let obj = req.body;
    let listOfStudentId;

    Class.find(
        {'id': id},
        function(err, result) {
            if (err) console.log(err);
            else {
                listOfStudentId = result[0].listOfStudentId.slice(0, result[0].listOfStudentId.length);
                for (var key in obj) {
                    if (obj[key]) listOfStudentId.push(key);
                }

                Class.findOneAndUpdate(
                    {'id': id},
                    {
                        $set: {
                            listOfStudentId: listOfStudentId
                        }
                    },
                    function(err, result) {
                        if (err) console.log(err);
                        else {
                            res.json(result);
                        }
                    }
                )
            }
        }
    )
}

exports.showStudentInClass = function (req, res) {
    let class_id = req.params.id;
    let classWithStudentInfo;
    let classWithTeacherInfo;
    Class.aggregate([
        {
            "$match": {"id": class_id}
        },
        {
            "$unwind": "$listOfStudentId"
        },
        {
            "$lookup": {
                "from": "students",
                "localField": "listOfStudentId",
                "foreignField": "id",
                "as": "student_docs"
            }
        },
        {
            "$match": {"student_docs": {$ne: []}}
        }
    ]).exec(function(err, result){
        classWithStudentInfo = result;
        Class.aggregate([
            {
                "$match": {"id": class_id}
            },
            {
                "$lookup": {
                    "from": "teachers",
                    "localField": "teacherId",
                    "foreignField": "id",
                    "as": "teacher_docs"
                    }
            },
        ]).exec(function(err, result){
            classWithTeacherInfo = result[0];
            res.json(
                {
                    classWithStudentInfo: classWithStudentInfo,
                    classWithTeacherInfo: classWithTeacherInfo
                }
            );
        })
    })
}

exports.deleteStudent = function(req, res) {
    let obj = req.body;
    let class_id = req.params.id;
    let listOfDeletedStudentId = [];
    let listOfStudentId;
    let updatedListOfStudentId = [];
    for (var key in obj) {
       if (obj[key]) listOfDeletedStudentId.push(key);
    }
    Class.find(
        {"id": class_id},
        function(err, result) {
            function foundInDeletedStudentList(studentId) {
                var found = false;
                for (let i = 0; i < listOfDeletedStudentId.length; i++) {
                    if (listOfDeletedStudentId[i] === studentId) {
                        found = true;
                        break;
                    }
                }
                return found;
            }
            if (err) console.log(err);
            else {
                listOfStudentId = result[0].listOfStudentId;
                for (let i = 0; i < listOfStudentId.length; i++) {
                    if (!foundInDeletedStudentList(listOfStudentId[i])) {
                        updatedListOfStudentId.push(listOfStudentId[i]);
                    }
                }
                Class.findOneAndUpdate(
                    {"id": class_id},
                    {
                        "$set": {"listOfStudentId": updatedListOfStudentId}
                    },
                    function(err, result){
                        if (err) console.log(err);
                        else res.json(result);
                    }
                )
            }
        }
    )
}

 exports.deleteStudentFromClasses = function (req, res) {
    let student_id = req.params.id;
    let listOfAllClass;
    Class.find(
        {},
        function(err, result){
            if (err) console.log(err);
            else {
                function containStudentId(array) {
                    var index = -1;
                    for (let i = 0; i < array.length; i++) {
                        if (array[i] === student_id) {
                            index = i;
                            break;
                        }
                    }
                    return index;
                }
                listOfAllClass = result;
                for (let i = 0; i < listOfAllClass.length; i++) {
                    let updatedListOfStudent;
                    let index = containStudentId(listOfAllClass[i].listOfStudentId);
                    if (index !== -1) {
                        updatedListOfStudent = [...listOfAllClass[i].listOfStudentId];
                        updatedListOfStudent.splice(index, 1);
                        Class.findOneAndUpdate(
                            {"id": listOfAllClass[i].id},
                            {
                                "$set": {"listOfStudentId": updatedListOfStudent}
                            },
                            function(err, result) {
                                if (err) console.log(err);
                            }
                        )
                    }
                }
                res.json("All classes are updated");
            }
        }
    );
}

exports.deleteTeacherFromClasses = function (req, res) {
    let teacher_id = req.params.id;
    Class.deleteMany(
        {"teacherId": teacher_id},
        function(err, result) {
            if (err) console.log(err);
            else res.json("All classes are updated");
        }
    )
}