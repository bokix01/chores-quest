const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_get = (req, res) => {
    User.findByPk(req.userData.user_id)
        .then(user => {
            return res.status(200).json({
                message: 'User successfully fetched',
                result: user
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
}

exports.user_edit = (req, res) => {
    User.findByPk(req.userData.user_id)
        .then(user => {
            user.first_name = req.body.first_name
            user.last_name = req.body.last_name
            user.username = req.body.username
            user.points = req.body.points
            user.save()
                .then(result => {
                    return res.status(200).json({
                        result: result
                    });
                })
                .catch(error => {
                    return res.status(500).json({
                        message: 'An error occurred while saving user data.',
                        error: error
                    });
                });
        })
        .catch(error => {
            return res.status(500).json({
                message: 'An error occurred while fetching user data.',
                error: error
            });
        });
}

exports.user_delete = (req, res) => {
    User.destroy({
        where: {
            id: req.userData.user_id
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

exports.signup = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            return res.status(409).json({
                message: 'This username is already in use.'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        error: error
                    });
                } else {
                    const user = new User({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        username: req.body.username,
                        password: hash,
                        is_group_admin: req.body.is_group_admin
                    })
                    user.save()
                        .then(result => {
                            return res.status(201).json({
                                message: result
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
    });
}

exports.login = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user == null) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
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
                }
                return res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(error => {
            console.log(error);
        });
}
