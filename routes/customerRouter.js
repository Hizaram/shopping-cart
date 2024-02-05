const express = require('express');
const CustomerController = require('../controllers/customerController');

const router = express.Router();

router.post('/', CustomerController.createCustomer);
router.get('/', CustomerController.getAllCustomers);
router.get('/:id', CustomerController.getCustomer);


module.exports = router;
