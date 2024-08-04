const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/config');

class Reward extends Model {}

Reward.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    uses: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Reward'
})

module.exports = Reward;
