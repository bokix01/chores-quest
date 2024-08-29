const { Task, User} = require('../models');

exports.task_get = async (req, res) => {
    try {
        const user = await User.findByPk(req.userData.user_id);
        let tasks = [];
        if (user) {
            if (user.is_group_admin) {
                tasks = await Task.findAll({
                    where: {
                        group_id: user.group_id
                    }
                });
            }
        } else {
            tasks = await Task.findAll({
                where: {
                    user_id: req.userData.user_id
                }
            });
        }
        return res.status(200).json({
            message: 'Tasks data fetched successfully.',
            tasks: tasks
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while fetching tasks data.',
            error: error
        });
    }
}

exports.task_create = async (req, res) => {
    try {
        const user = await User.findByPk(req.userData.user_id);

        const task = await new Task({
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
        });
        await task.save();

        return res.status(200).json({
            message: 'Task created successfully.'
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occured while creating task.',
            error: error
        });
    }
}

exports.task_id_get = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.taskId);

        return res.status(200).json({
            message: 'Task data fetched successfully.',
            task: task
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occured while fetching task data.',
            error: error
        });
    }
}

exports.task_id_edit = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.taskId);

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
        await task.save();

        return res.status(200).json({
            message: 'Task data changed successfully.'
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while changing task data.',
            error: error
        });
    }
}

exports.task_id_delete = async (req, res) => {
    try {
        await Task.destroy({
            where: {
                id: req.params.taskId
            }
        });

        return res.status(200).json({
            message: 'Task data deleted successfully.'
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while deleting task data.',
            error: error
        });
    }
}
