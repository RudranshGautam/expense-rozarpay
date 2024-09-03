const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.get('/', expenseController.getExpensePage);
router.post('/add', expenseController.addExpense);
router.get('/delete/:id', expenseController.deleteExpense);

module.exports = router;