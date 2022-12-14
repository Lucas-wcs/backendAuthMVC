const router = require('express').Router();
const usersController = require("../controllers/users.controller");
const jwt = require("jsonwebtoken");
const connection = require("../config/db");


const getAuth = async (req, res, next) => {
    let token = req.headers["authorization"];
    token = token ? token.split(" ")[1] : null;
    if(token === null) {
        return res.status(200).send("Not connected");
    }
    const {user} = await jwt.verify(token, process.env.TOKEN_SECRET);
    if(!user) {
        return res.status(200).send("Not connected");
    }
    const [result] = await connection.query("SELECT * FROM users WHERE login=? AND id=?;", [user.login.toString(), user.id.toString()]);
    if(result.length > 0) {
        next();
    } else {
        res.status(200).send("Not connected");
    }
    
}

router.post("/register", usersController.inscription);
router.post("/login", usersController.login);
router.get("/", getAuth, usersController.getUsers);

module.exports = router;