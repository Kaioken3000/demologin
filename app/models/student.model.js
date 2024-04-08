module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("students", {
        student_code: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        student_name: {
            type: Sequelize.STRING
        },
    });

    return Student;
};