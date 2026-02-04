const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProductImage = sequelize.define(
    'ProductImage',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      image_url: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      tableName: 'product_images',
      timestamps: false,
    }
  );

  return ProductImage;
};
