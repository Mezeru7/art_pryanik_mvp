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
  const { image_url, ...productData } = data;
  const product = await Product.create(productData);

  if (image_url && image_url.trim()) {
    await ProductImage.create({ product_id: product.id, image_url: image_url.trim() });
  }

  return getById(product.id);
};

const update = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) return null;

  const { image_url, ...productData } = data;
  await product.update(productData);

  if (image_url !== undefined) {
    await ProductImage.destroy({ where: { product_id: id } });
    if (image_url && image_url.trim()) {
      await ProductImage.create({ product_id: id, image_url: image_url.trim() });
    }
  }

  return getById(id);
};

const remove = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return true;
};

module.exports = { getAll, getById, create, update, remove };
