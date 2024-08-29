const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/checkAdmin');
const checkOwnership = require('../middleware/checkOwnership');
const groupController = require('../controllers/group');

router.post('/', checkAuth, checkAdmin, groupController.group_create);
// router.get('/users')
router.get('/:groupId', checkAuth, groupController.group_id_get);
router.put('/:groupId', checkAuth, checkAdmin, checkOwnership, groupController.group_id_edit);
router.delete('/:groupId', checkAuth, checkAdmin, checkOwnership, groupController.group_id_delete);

module.exports = router;
