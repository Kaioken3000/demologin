const db = require("../models");
const Parent = db.parent;
const Student = db.student;
const Op = db.Sequelize.Op;

// Retrieve all student with parent id from the database.
exports.findAllStudentByParentId = (req, res) => {
    const id = req.params.parentid;

    Parent.findByPk(id, { include: ["students"] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Parent with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Parent with id=" + id
            });
        });
};
// Retrieve one student with parent id and student id from the database.
exports.findStudentByParentIdAndStudentId = (req, res) => {
    const parentid = req.params.parentid;
    const studentid = req.params.studentid;

    Student.findByPk(studentid, {
        where: {
            parentPhoneNumber: parentid,
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
