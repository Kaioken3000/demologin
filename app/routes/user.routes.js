const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");
const parent = require("../controllers/parent.controller");
const student = require("../controllers/student.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", user.allAccess);

    /*--------------------------Admin route--------------------------*/
    // Retrieve all Users

    app.get(
        "/api/users",
        [authJwt.verifyToken, authJwt.isAdmin],
        user.findAll
    );

    // Retrieve a single User with id
    app.get(
        "/api/user/:id", 
        [authJwt.verifyToken, authJwt.isAdmin],
        user.findOne
    );

    /*--------------------------Parent route--------------------------*/
    // Retrieve all Student with Parent id
    app.get(
        "/api/allstudent/:parentid", 
        [authJwt.verifyToken, authJwt.isParent],
        parent.findAllStudentByParentId
    );
    // Retrieve one Student with Parent id and student id
    app.get(
        "/api/student/:parentid/:studentid", 
        [authJwt.verifyToken, authJwt.isParent],
        parent.findStudentByParentIdAndStudentId
    );
    /*--------------------------Student route--------------------------*/
    // Retrieve one Student with student id
    app.get(
        "/api/student/:studentid", 
        [authJwt.verifyToken, authJwt.isStudent],
        student.findStudentById
    );
};