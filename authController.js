const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../db');

exports.getSignupPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
};

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        res.redirect('/auth/login');
    } catch (err) {
        res.send('Error in signup');
    }
};

exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.send('Invalid email or password');
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.redirect('/expenses');
        } else {
            res.send('Invalid email or password');
        }
    } catch (err) {
        res.send('Error in login');
    }
};