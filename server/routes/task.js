const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/checkAdmin');
const taskController = require('../controllers/task');

router.get('/', checkAuth, taskController.task_get);
router.post('/', checkAuth, checkAdmin, taskController.task_create);
router.get('/:taskId', checkAuth, taskController.task_id_get);
router.put('/:taskId', checkAuth, checkAdmin, taskController.task_id_edit);
router.delete('/:taskId', checkAuth, checkAdmin, taskController.task_id_delete);

module.exports = router;
