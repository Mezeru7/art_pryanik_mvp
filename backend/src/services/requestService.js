const { Request } = require('../models');

const create = async (data) => {
  return Request.create(data);
};

const getAll = async () => {
  return Request.findAll({ order: [['created_at', 'DESC']] });
};

module.exports = { create, getAll };
