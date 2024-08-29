const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_get = async (req, res) => {
    try {
        const user = await User.findByPk(req.userData.user_id);

        return res.status(200).json({
            message: 'User data fetched successfully.',
            user: user
        });
    } catch(error) {
        res.status(500).json({
            message: 'An error occurred while fetching user data.',
            error: error
        });
    }
}

exports.user_edit = async (req, res) => {
    try {
        const user = await User.findByPk(req.userData.user_id);
        user.first_name = req.body.first_name
        user.last_name = req.body.last_name
        user.username = req.body.username
        user.points = req.body.points
        await user.save()

        return res.status(200).json({
            message: 'User data changed successfully.'
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while changing user data.',
            error: error
        });
    }
}

exports.user_delete = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.userData.user_id
            }
        });

        return res.status(200).json({
            message: 'User data deleted successfully.',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error occurred while changing user data.',
            error: error
        });
    }
}

exports.signup = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (user) {
            return res.status(409).json({
                message: 'This username is already in use.'
            });
        } else {
            const password = await bcrypt.hash(req.body.password, 10);

            const user = await new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: password,
                is_group_admin: req.body.is_group_admin,
                points: 0
            })

            await user.save();
            return res.status(200).json({
                message: 'User created successfully.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'An error occurred while creating user.',
            error: error
        });
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (user == null) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }

        await bcrypt.compare(req.body.password, user.password);
        const token = jwt.sign({
            user_id: user.id,
            username: user.username
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
        });
        return res.status(200).json({
            message: 'Auth successful',
            token: token
        });
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed.'
        });
    }
}
