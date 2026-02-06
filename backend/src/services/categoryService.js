const { Category } = require('../models');

const getAll = async () => {
  return Category.findAll({ order: [['name', 'ASC']] });
};

const getById = async (id) => {
  return Category.findByPk(id);
};

module.exports = { getAll, getById };
