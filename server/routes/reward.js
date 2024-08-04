const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/checkAdmin');
const rewardController = require('../controllers/reward');

router.get('/', checkAuth, rewardController.reward_get);
router.post('/', checkAuth, checkAdmin, rewardController.reward_create);
router.get('/:rewardId', checkAuth, rewardController.reward_id_get);
router.put('/:rewardId', checkAuth, checkAdmin, rewardController.reward_id_edit);
router.delete('/:rewardId', checkAuth, checkAdmin, rewardController.reward_id_delete);

module.exports = router;
