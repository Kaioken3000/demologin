module.exports = (sequelize, Sequelize) => {
    const Parent = sequelize.define("parents", {
        phone_number: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        parent_name: {
            type: Sequelize.STRING
        },
    });

    return Parent;
};