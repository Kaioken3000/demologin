module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("classes", {
        class_code: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        class_name: {
            type: Sequelize.STRING
        },
    });

    return Class;
};