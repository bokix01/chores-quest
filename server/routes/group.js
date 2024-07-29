const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/checkAdmin');
const groupController = require('../controllers/group');

router.get('/', checkAuth, groupController.group_get);
router.post('/', checkAuth, checkAdmin, groupController.group_create);
router.get('/:groupId', checkAuth, groupController.group_id_get);
router.put('/:groupId', checkAuth, checkAdmin, groupController.group_id_edit);
router.delete('/:groupId', checkAuth, checkAdmin, groupController.group_id_delete);

module.exports = router;
