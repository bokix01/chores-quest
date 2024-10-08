const { User } = require("../models");

module.exports = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userData.user_id)
        if (user) {
            if (user.is_group_admin) {
                next();
            }
        } else {
            return res.status(401).json({
                message: 'Not admin'
            });
        }
    } catch(error) {
        return res.status(500).json({
            error: error
        });
    }
}
