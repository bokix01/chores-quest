const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/config');

class Group extends Model {}

Group.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Group'
})

module.exports = Group;
