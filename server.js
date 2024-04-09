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
const Teacher = db.teacher;
const Class = db.class;

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
    /*------------------Create Role------------------*/
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
        name: "teacher"
    });

    Role.create({
        id: 4,
        name: "admin"
    });

    /*------------------Create User Admin------------------*/
    // user 1
    User.create({
        username: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("admin", 8)
    })
        .then(user => {
            // admin role = 4
            user.setRoles([4]);
        });

    /*------------------Create User Parent------------------*/
    // user 2
    User.create({
        username: "parent",
        email: "parent@gmail.com",
        password: bcrypt.hashSync("parent", 8)
    })
        .then(user => {
            // parent role = 2
            user.setRoles([2]);
        });
    // parent
    Parent.create({
        phone_number: "0787887155",
        parent_name: "parent",
        userId: 2
    });

    /*------------------Create User Teacher and Class------------------*/
    // user 3
    User.create({
        username: "teacher",
        email: "teacher@gmail.com",
        password: bcrypt.hashSync("teacher", 8)
    })
        .then(user => {
            // teacher role = 3
            user.setRoles([3]);
        });
    // teacher
    Teacher.create({
        teacher_code: "T1",
        teacher_name: "teacher",
        userId: 3
    });
    // class
    Class.create({
        class_code: "C1",
        class_name: "class1",
        teacherTeacherCode: "T1"
    });

    /*------------------Create User Student------------------*/
    // user 4
    User.create({
        username: "student1",
        email: "student1@gmail.com",
        password: bcrypt.hashSync("student1", 8)
    })
        .then(user => {
            // student role = 1`
            user.setRoles([1]);
        });
    // user 5
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
        userId: 4,
        classClassCode: "C1"
    });
    // student 2
    Student.create({
        student_code: "S2",
        student_name: "student2",
        parentPhoneNumber: "0787887155",
        userId: 5,
        classClassCode: "C1"
    });
}