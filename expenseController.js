const path = require('path');
const db = require('../db');

exports.getExpensePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/expenses.html'));
};

exports.addExpense = async (req, res) => {
    const { amount, description, category } = req.body;
    const userId = 1; // For simplicity, assume user ID is 1
    try {
        await db.execute('INSERT INTO expenses (user_id, amount, description, category) VALUES (?, ?, ?, ?)', [userId, amount, description, category]);
        res.redirect('/expenses');
    } catch (err) {
        res.send('Error in adding expense');
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM expenses WHERE id = ?', [id]);
        res.redirect('/expenses');
    } catch (err) {
        res.send('Error in deleting expense');
    }
};