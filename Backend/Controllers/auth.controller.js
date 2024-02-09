const bcrypt = require('bcrypt')
const dbHandler = require('../Database/dbHandler')
const jwt = require("jsonwebtoken")
const register = async (req, res,next) => {
    try {
        const { name, email, password, phone,role } = req.body;
        if (!name || !email || !password || !phone) {
            res.status(400).json({ error: "All fields are required" });
        }
        const user = await dbHandler.selectUserByEmail(email);
        if(user.length > 0){
            res.status(400).json({message: " email already exists"});
        }
        //hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            name,
            email,
            password: hashedPassword,
            phone,
            role,
        }
        await dbHandler.insertUser(userData);
        res.status(201).json({ message: "User was added successfully" });

    } catch (error) {
        throw error;
        next();
    }
}

const login = async (req, res,next) => {
    try {
        const { email, password } = req.body;
        const user = await dbHandler.selectUserByEmail(email);
        if (user.length === 0) {
            return res.status(401).json({ error: "invalid credentials" });
        }
        const passwordmatch = await bcrypt.compare(password, user[0].password);
        if (!passwordmatch) {
            return res.status(401).json({ error: "invalid credentials" });
        }
        const token = jwt.sign({
            userId: user[0].ID,
            role: user[0].role,
            name: user[0].name,
            email: user[0].email
        },
            process.env.JWT_SECRET, {
            expiresIn: "24h",
        })
        res.status(200).json({ token });
    } catch (error) {
       throw error;
    }
}
const selectUsers = async (req, res) => {
    try {
        const result = await dbHandler.selectUsers();
        if (result.length > 0) {
            res.status(200).json({ result });
        } else {
            res.status(200).json({ message: "no users found" })  
        }
    } catch (error) {
        throw error;
        next();
    }
}

module.exports = {
    register,
    login,
    selectUsers
}