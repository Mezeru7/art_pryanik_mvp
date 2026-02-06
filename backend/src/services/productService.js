const { Product, ProductImage, Category } = require('../models');

const getAll = async () => {
  return Product.findAll({
    include: [
      { model: Category, attributes: ['id', 'name'] },
      { model: ProductImage, attributes: ['id', 'image_url'] },
    ],
    order: [['created_at', 'DESC']],
  });
};

const getById = async (id) => {
  return Product.findByPk(id, {
    include: [
      { model: Category, attributes: ['id', 'name'] },
      { model: ProductImage, attributes: ['id', 'image_url'] },
    ],
  });
};

module.exports = { getAll, getById };
