const { Order, OrderItem, Product } = require('../models');

const getAll = async () => {
  return Order.findAll({
    include: [{ model: OrderItem, include: [{ model: Product, attributes: ['id', 'title'] }] }],
    order: [['created_at', 'DESC']],
  });
};

const getById = async (id) => {
  return Order.findByPk(id, {
    include: [{ model: OrderItem, include: [{ model: Product, attributes: ['id', 'title'] }] }],
  });
};

module.exports = { getAll, getById };
