const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // (Optional, for development only)
            }
        },
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.parent = require("../models/parent.model.js")(sequelize, Sequelize);
db.student = require("../models/student.model.js")(sequelize, Sequelize);
db.class = require("../models/class.model.js")(sequelize, Sequelize);
db.teacher = require("../models/teacher.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
});

// one to many parent-student
db.parent.hasMany(db.student);
db.student.belongsTo(db.parent);

// one to many class-student
db.class.hasMany(db.student);
db.student.belongsTo(db.class);

// one to many class-teacher
db.teacher.hasMany(db.class);
db.class.belongsTo(db.teacher);

// one to many user-parent
db.user.hasOne(db.parent, {
    foreignKey: 'userId', targetKey: 'id'
});

db.parent.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});
// one to many user-student
db.user.hasOne(db.student, {
    foreignKey: 'userId', targetKey: 'id'
});
db.student.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});
// one to many user-teacher
db.user.hasOne(db.teacher, {
    foreignKey: 'userId', targetKey: 'id'
});
db.teacher.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});


db.ROLES = ["student", "parent", "teacher", "admin"];

module.exports = db;