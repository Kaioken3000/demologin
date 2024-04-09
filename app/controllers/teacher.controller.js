const db = require("../models");
const Teacher = db.teacher;
const Student = db.student;
const Class = db.class;
const Op = db.Sequelize.Op;

// Retrieve all student with teacher id from the database.
exports.findAllClassByTeacherId = (req, res) => {
    const id = req.params.teacherid;

    Class.findAll({where: {teacherTeacherCode: id}, include: ["students"] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Class with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Class with id=" + id
            });
        });
};
// Retrieve one student with teacher id and student id from the database.
exports.findStudentByTeacherIdAndStudentId = (req, res) => {
    const teacherid = req.params.teacherid;
    const studentid = req.params.studentid;

    Student.findByPk(studentid, {
        where: {
            teacherPhoneNumber: teacherid,
        },
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Student with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Student with id=" + id
            });
        });
};
