const db = require("../models");
const Student = db.student;
const Op = db.Sequelize.Op;

// Retrieve all student with parent id from the database.
exports.findStudentById = (req, res) => {
    const id = req.params.studentid;

    Student.findByPk(id)
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
