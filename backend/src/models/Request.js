const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Request = sequelize.define(
    'Request',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'requests',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  return Request;
};
