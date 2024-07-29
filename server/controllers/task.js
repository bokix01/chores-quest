const { Task, User, Group} = require('../models');

exports.task_get = (req, res) => {
    User.findByPk(req.userData.user_id)
        .then(user => {
            if (user) {
                if (user.is_group_admin) {
                    Task.findAll({
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
            } else {
                Task.findAll({
                    where: {
                        user_id: req.userData.user_id
                    }
                })
                    .then(result => {
                        return res.status(200).json({
                            result2: result
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

exports.task_create = (req, res) => {
    User.findByPk(req.userData.user_id)
        .then(user => {
            if (user) {
                new Task({
                    name: req.body.name,
                    points: req.body.points,
                    deadline: new Date(Date.UTC(
                        req.body.year,
                        req.body.month + 1,
                        req.body.day,
                        req.body.hour,
                        req.body.minute
                    )),
                    user_id: req.body.user_id,
                    group_id: user.group_id,
                    finished: false
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

exports.task_id_get = (req, res) => {
    Task.findByPk(req.params.taskId)
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

exports.task_id_edit = (req, res) => {
    Task.findByPk(req.params.taskId)
        .then(task => {
            task.name = req.body.name;
            task.points = req.body.points;
            task.deadline = new Date(Date.UTC(
                req.body.year,
                req.body.month + 1,
                req.body.day,
                req.body.hour,
                req.body.minute
            ));
            task.user_id = req.body.user_id;
            task.finished = req.body.finished;
            task.save()
                .then(task => {
                    if (task) {
                        return res.status(200).json({
                            result: 'Task edited successfully.'
                        });
                    } else {
                        return res.status(200).json({
                            result: 'Task not edited due to some issues.'
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

exports.task_id_delete = (req, res) => {
    Task.destroy({
        where: {
            id: req.params.taskId
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
