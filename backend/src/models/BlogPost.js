const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      preview_text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      tableName: 'blog_posts',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  return BlogPost;
};
