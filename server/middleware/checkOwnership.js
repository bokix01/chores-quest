const { User } = require("../models");

module.exports = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userData.user_id,
                group_id: req.params.groupId
            }
        });

        if (user) {
            next();
        } else {
            return res.status(401).json({
                message: 'Not owner of the group'
            });
        }
    } catch(error) {
        return res.status(500).json({
            error: error
        });
    }
}
