const express = require('express');
const router = express.Router();

const { authorizePermissions, authenticateUser } = require('../middleware/authentication');
const { contactUs } = require('../controllers/userController');

router.route('/contact').post(contactUs);

module.exports = router;