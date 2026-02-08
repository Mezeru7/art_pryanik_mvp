const { Product, ProductImage, Category } = require('../models');

const getAll = async ({ category_id } = {}) => {
  const where = category_id ? { category_id } : {};
  return Product.findAll({
    where,
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

const create = async (data) => {
  return Product.create(data);
};

const update = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  return product.update(data);
};

const remove = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return true;
};

module.exports = { getAll, getById, create, update, remove };
