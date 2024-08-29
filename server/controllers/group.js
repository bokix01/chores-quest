const { User, Group } = require('../models');

exports.group_create = async (req, res) => {
    let invite_code = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
        invite_code += characters[Math.floor(Math.random() * characters.length)];
    }

    try {
        let group = await new Group({
            name: req.body.name,
            invite_code: invite_code
        });
        await group.save();

        let user = await User.findByPk(req.userData.user_id);
        user.group_id = group.id;
        await user.save();

        return res.status(200).json({
            message: 'Group created successfully.',
            invite_code: invite_code
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while creating group.',
            error: error
        });
    }
}

exports.group_id_get = async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.groupId);

        return res.status(200).json({
            message: 'Group data fetched successfully.',
            group: group
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while fetching group data.',
            error: error
        });
    }
}

exports.group_id_edit = async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.groupId);

        group.name = req.body.name;
        await group.save();

        return res.status(200).json({
            message: 'Group data changed successfully.'
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while changing group data.',
            error: error
        });
    }
}

exports.group_id_delete = async (req, res) => {
    try {
        await Group.destroy({
            where: {
                id: req.params.groupId
            }
        });

        return res.status(200).json({
            message: 'Group data deleted successfully',
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while deleting group data.',
            error: error
        });
    }
}
