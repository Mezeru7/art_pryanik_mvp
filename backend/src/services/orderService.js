const { Order, OrderItem, Product, User } = require('../models');
const { v4: uuidv4 } = require('uuid');

const getAll = async () => {
  return Order.findAll({
    include: [
      {
        model: OrderItem,
        include: [{ model: Product, attributes: ['id', 'title', 'price'] }],
      },
    ],
    order: [['created_at', 'DESC']],
  });
};

const getById = async (id) => {
  return Order.findByPk(id, {
    include: [
      {
        model: OrderItem,
        include: [{ model: Product, attributes: ['id', 'title', 'price'] }],
      },
    ],
  });
};

const create = async ({ customer_name, customer_phone, comment, user_id, items }) => {
  
  const order_code = `AP-${Date.now()}-${uuidv4().slice(0, 6).toUpperCase()}`;

  const total_price = items.reduce((sum, item) => sum + item.price_at_moment * item.quantity, 0);
  
  const order = await Order.create({
    order_code,
    customer_name,
    customer_phone,
    comment: comment || null,
    user_id: user_id || null,
    total_price,
    status: 'new',
  });

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price_at_moment: item.price_at_moment,
  }));

  await OrderItem.bulkCreate(orderItems);

  return getById(order.id);
};

const updateStatus = async (id, status) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  return order.update({ status });
};

const remove = async (id) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  await order.destroy();
  return true;
};

module.exports = { getAll, getById, create, updateStatus, remove };
