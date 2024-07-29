const { User } = require("../models");

module.exports = (req, res, next) => {
    User.findByPk(req.userData.user_id)
        .then(user => {
            console.log(user.is_group_admin)
            if (user) {
                if (user.is_group_admin) {
                    next();
                }
            } else {
                return res.status(200).json({
                    message: 'Not admin'
                });
            }
        })
        .catch(error => {
            return res.status(500).json({
                error: error
            });
        });
}
