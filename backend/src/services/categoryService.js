const { Category, Product, ProductImage } = require('../models');

const getAll = async () => {
  return Category.findAll({ order: [['name', 'ASC']] });
};

const getById = async (id) => {
  return Category.findByPk(id);
};

const getProductsByCategory = async (id) => {
  return Category.findByPk(id, {
    include: [
      {
        model: Product,
        include: [{ model: ProductImage, attributes: ['id', 'image_url'] }],
      },
    ],
  });
};

const create = async (data) => {
  return Category.create(data);
};

const update = async (id, data) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  return category.update(data);
};

const remove = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  await category.destroy();
  return true;
};

module.exports = { getAll, getById, getProductsByCategory, create, update, remove };
