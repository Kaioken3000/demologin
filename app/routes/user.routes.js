const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", user.allAccess);

    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        user.userBoard
    );

    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        user.moderatorBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        user.adminBoard
    );

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
};