const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const userController = require('../controllers/user');

router.get('/', checkAuth, userController.user_get);
router.put('/', checkAuth, userController.user_edit);
router.delete('/', checkAuth, userController.user_delete);
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
