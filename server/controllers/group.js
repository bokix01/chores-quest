const { User, Group } = require('../models');

exports.group_get = (req, res) => {
    User.findByPk(req.userData.user_id)
        .then(user => {
            if (user) {
                Group.findByPk(user.group_id)
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
        });
}

exports.group_create = (req, res) => {
    new Group({
        name: req.body.name
    }).save()
        .then(group => {
            User.findByPk(req.userData.user_id)
                .then(user => {
                    user.group_id = group.id;
                    user.save()
                        .then(user => {
                            if (user) {
                                return res.status(201).json({
                                    message: 'Success'
                                });
                            } else {
                                return res.status(201).json({
                                    message: 'Not working'
                                });
                            }
                        })
                        .catch(error => {
                            return res.status(500).json({
                                error: error
                            });
                        });
                })
                .catch(error => {
                    return res.status(500).json({
                        error: error
                    });
                });
        })
        .catch(error => {
            return res.status(500).json({
                error: error
            });
        });
}

exports.group_id_get = (req, res) => {
    Group.findByPk(req.params.groupId)
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

exports.group_id_edit = (req, res) => {
    const group_id = req.params.groupId;
    User.findOne({
        where: {
            id: req.userData.user_id,
            group_id: group_id
        }
    })
        .then(user => {
            if (user) {
                Group.findByPk(group_id)
                    .then(group => {
                        group.name = req.body.name;
                        group.save()
                            .then(group => {
                                if (group) {
                                    return res.status(200).json({
                                        result: 'Group edited successfully.'
                                    });
                                } else {
                                    return res.status(200).json({
                                        result: 'Group not edited due to some issues.'
                                    });
                                }
                            });
                    })
                    .catch(error => {
                        return res.status(500).json({
                            result: error
                        });
                    });
            } else {
                return res.status(200).json({
                    result: 'Group not edited due to some issues.'
                });
            }
        })
        .catch(error => {
            return res.status(500).json({
                result: error
            });
        });
}

exports.group_id_delete = (req, res) => {
    const group_id = req.params.groupId;
    User.findOne({
        where: {
            id: req.userData.user_id,
            group_id: group_id
        }
    })
        .then(user => {
            if (user) {
                Group.destroy({
                    where: {
                        id: group_id
                    }
                })
                    .then(deleted => {
                        if (deleted) {
                            return res.status(200).json({
                                result: 'Group deleted successfully.'
                            });
                        } else {
                            return res.status(200).json({
                                result: 'Group not deleted due to some issues.'
                            });
                        }
                    })
                    .catch(error => {
                        return res.status(500).json({
                            result: error
                        });
                    });
            } else {
                return res.status(200).json({
                    result: 'Group not deleted due to some issues.'
                });
            }
        })
        .catch(error => {
            return res.status(500).json({
                result: error
            });
        });
}
