const usersModel = require("../models/users.model");
const jwt = require("jsonwebtoken");

const inscription = async (req, res) => {
    const {login, password} = req.body;
    const result = await usersModel.inscription(login, password);
    if(result === "Created") {
        return res.status(201).send("Inscription effectuée");
    } else if(result === "Not Created") {
        return res.status(200).send("Pseudo déjà pris");
    }
    
    res.status(500).send("Something broke");
}

const login = async (req, res) => {
    const {login, password} = req.body;
    const result = await usersModel.login(login, password);
    if(result.length > 0) {
        const token = jwt.sign({user : result[0]}, process.env.TOKEN_SECRET, {expiresIn : '24h'})
        return res.status(200).send(token);
    }
    
    res.status(200).send("No user found");
    
}

const getUsers = async (req, res) => {
    const result = await usersModel.getUsers();
    res.status(200).send(result);
}

module.exports = {
    inscription,
    login,
    getUsers
}