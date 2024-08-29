const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/config');

class Group extends Model {}

Group.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    invite_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: 'Group'
})

module.exports = Group;
