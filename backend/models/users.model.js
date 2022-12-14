const connection = require("../config/db");
const bcrypt = require("bcrypt");

const inscription = async (login, password) => {
    
    try {
        const hashedPassword = await bcrypt.hashSync(password, process.env.SALT);
        const [result] = await connection.query("INSERT INTO users (login, password) VALUES (?, ?)", [login, hashedPassword]);
        if(result.affectedRows > 0) {
            return "Created";
        }
        
        return "Not created";
    } catch(e) {
        console.log(err);
        return "Error : "+ err;
    }
}

const login = async (login, password) => {
    const hashedPassword = await bcrypt.hashSync(password, process.env.SALT);
    const [result] = await connection.query("SELECT * FROM users WHERE login=? AND password=?", [login, hashedPassword]);
    return result;
}

const getUsers = async () => {
    const [result] = await connection.query("SELECT * FROM users;");
    return result;
}


module.exports = {
    inscription,
    login,
    getUsers
}