module.exports = (sequelize, Sequelize) => {
    const Teacher = sequelize.define("teachers", {  
        teacher_code: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        teacher_name: {
            type: Sequelize.STRING
        },
    });

    return Teacher;
};