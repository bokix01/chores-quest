const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/config');

class Task extends Model {}

Task.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    finished: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Task'
})

module.exports = Task;
