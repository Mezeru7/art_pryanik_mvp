const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // гостевые заказы
        references: {
          model: 'users',
          key: 'id',
        },
      },
      customer_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      customer_phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('new', 'processing', 'completed', 'cancelled'),
        defaultValue: 'new',
      },
    },
    {
      tableName: 'orders',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  return Order;
};
