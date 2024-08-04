const { User, Reward } = require('../models');

exports.reward_get = (req, res) => {
    User.findByPk(req.userData.user_id)
        .then(user => {
            if (user) {
                Reward.findAll({
                    where: {
                        group_id: user.group_id
                    }
                })
                    .then(result => {
                        return res.status(200).json({
                            result: result
                        });
                    })
                    .catch(error => {
                        return res.status(500).json({
                            error: error
                        });
                    });
            }
        })
        .catch(error => {
            return res.status(500).json({
                error: error
            });
        });
}

exports.reward_create = (req, res) => {
    User.findByPk(req.userData.user_id)
        .then(user => {
            if (user) {
                new Reward({
                    name: req.body.name,
                    points: req.body.points,
                    uses: req.body.uses,
                    group_id: user.group_id,
                }).save()
                    .then(task => {
                        return res.status(200).json({
                            task: task
                        });
                    })
                    .catch(error => {
                        return res.status(500).json({
                            error: error
                        });
                    });
            }
        })
        .catch(error => {
            return res.status(500).json({
                error: error
            });
        })

}

exports.reward_id_get = (req, res) => {
    Reward.findByPk(req.params.rewardId)
        .then(result => {
            return res.status(200).json({
                result: result
            });
        })
        .catch(error => {
            return res.status(500).json({
                error: error
            });
        });
}

exports.reward_id_edit = (req, res) => {
    Reward.findByPk(req.params.rewardId)
        .then(reward => {
            reward.name = req.body.name;
            reward.points = req.body.points;
            reward.uses = req.body.uses;
            reward.save()
                .then(task => {
                    if (task) {
                        return res.status(200).json({
                            result: 'Reward edited successfully.'
                        });
                    } else {
                        return res.status(200).json({
                            result: 'Reward not edited due to some issues.'
                        });
                    }
                });
        })
        .catch(error => {
            return res.status(500).json({
                result: error
            });
        });
}

exports.reward_id_delete = (req, res) => {
    Reward.destroy({
        where: {
            id: req.params.rewardId
        }
    })
        .then(result => {
            return res.status(200).json({
                result: result
            });
        })
        .catch(error => {
            return res.status(500).json({
                error: error
            });
        });
}
