const User = require('./userModel');
const Group = require('./groupModel');
const Task = require('./taskModel');

// User and Group association
Group.hasMany(User, {onDelete: 'cascade'});
User.belongsTo(Group, {foreignKey: 'group_id'});

// User and Task association
User.hasMany(Task, {onDelete: 'cascade'});
Task.belongsTo(User, {foreignKey: 'user_id'});

// Group and Task association
Group.hasMany(Task, {onDelete: 'cascade'});
Task.belongsTo(Group, {foreignKey: 'group_id'});

module.exports = {
  User,
  Group,
  Task
}
