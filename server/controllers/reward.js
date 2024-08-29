const { User, Reward } = require('../models');

exports.reward_get = async (req, res) => {
    try {
        const user = await User.findByPk(req.userData.user_id)

        const rewards = await Reward.findAll({
            where: {
                group_id: user.group_id
            }
        });

        return res.status(200).json({
            message: 'Rewards data fetched successfully.',
            rewards: rewards
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while fetching rewards data.',
            error: error
        });
    }
}

exports.reward_create = async (req, res) => {
    try {
        const user = User.findByPk(req.userData.user_id);

        const reward = await new Reward({
            name: req.body.name,
            points: req.body.points,
            uses: req.body.uses,
            group_id: user.group_id,
        });
        await reward.save();

        return res.status(200).json({
            message: 'Reward created successfully.',
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while creating reward.',
            error: error
        });
    }
}

exports.reward_id_get = async (req, res) => {
    try {
        const reward = await Reward.findByPk(req.params.rewardId);

        return res.status(200).json({
            message: 'Reward data fetched successfully.',
            reward: reward
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while fetching reward data.',
            error: error
        });
    }
}

exports.reward_id_edit = async (req, res) => {
    try {
        const reward = await Reward.findByPk(req.params.rewardId);
        reward.name = req.body.name;
        reward.points = req.body.points;
        reward.uses = req.body.uses;
        await reward.save();

        return res.status(200).json({
            message: 'Reward data changed successfully.'
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while changing reward data.',
            error: error
        });
    }
}

exports.reward_id_delete = async (req, res) => {
    try {
        await Reward.destroy({
            where: {
                id: req.params.rewardId
            }
        });

        return res.status(200).json({
            message: 'Reward data deleted successfully.'
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while deleting reward data.',
            error: error
        });
    }
}
