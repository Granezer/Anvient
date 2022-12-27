const jwt = require('jsonwebtoken')
const key = process.env.JWT_KEY

const login = async (req, res) => {
    const { username, password } = req.body
    const adminPassword = process.env.PASSWORD

    if (!username || !password || password !== adminPassword) {
        return res.status(400).json({ msg: "Pls provide the valid credentials..." })
    }
    const token = jwt.sign({username}, key, {'expiresIn': "30d"})
    res.status(201).json({ msg: 'Admin login was successful', token: token })
}


module.exports = {
    login,
}