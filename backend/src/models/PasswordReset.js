const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PasswordReset = sequelize.define(
    'PasswordReset',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'password_resets',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  return PasswordReset;
};
