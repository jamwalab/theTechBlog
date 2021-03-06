const User = require('./User');
const Post = require("./Post");;
const Comment = require('./Comments');

//create associations user and post
User.hasMany(Post, {
  foreignKey:'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

//associations Comment, user and post

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };