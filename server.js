const express = require("express");
// const cors = require("cors");

const app = express();

// var corsOptions = {
//     origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Parent = db.parent;
const Student = db.student;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Database with { force: true }');
//     initial();
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const bcrypt = require("bcryptjs");

function initial() {
    Role.create({
        id: 1,
        name: "student"
    });

    Role.create({
        id: 2,
        name: "parent"
    });

    Role.create({
        id: 3,
        name: "admin"
    });

    // user 1
    User.create({
        username: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("admin", 8)
    })
        .then(user => {
            // admin role = 3
            user.setRoles([3]);
        });
    // user 2
    User.create({
        username: "parent",
        email: "parent@gmail.com",
        password: bcrypt.hashSync("parent", 8)
    })
        .then(user => {
            // parent role = 1
            user.setRoles([2]);
        });
    // parent
    Parent.create({
        phone_number: "0787887155",
        parent_name: "parent",
        userId: 2
    });
    
    // user 3
    User.create({
        username: "student1",
        email: "student1@gmail.com",
        password: bcrypt.hashSync("student1", 8)
    })
        .then(user => {
            // student role = 1`
            user.setRoles([1]);
        });
    // user 4
    User.create({
        username: "student2",
        email: "student2@gmail.com",
        password: bcrypt.hashSync("student2", 8)
    })
        .then(user => {
            // student role = 1
            user.setRoles([1]);
        });
    
    // student 1
    Student.create({
        student_code: "S1",
        student_name: "student1",
        parentPhoneNumber: "0787887155",
        userId: 3
    });
    // student 2
    Student.create({
        student_code: "S2",
        student_name: "student2",
        parentPhoneNumber: "0787887155",
        userId: 4
    });
}