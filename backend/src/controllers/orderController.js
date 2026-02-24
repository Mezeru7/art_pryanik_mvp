const orderService = require('../services/orderService');

// GET /api/orders
const getAll = async (req, res) => {
  try {
    const orders = await orderService.getAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/orders/:id
const getById = async (req, res) => {
  try {
    const order = await orderService.getById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Заказ не найден' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/orders
const create = async (req, res) => {
  try {
    const { customer_name, customer_phone, comment, user_id, items } = req.body;

    if (!customer_name || !customer_phone) {
      return res.status(400).json({ error: 'Имя и телефон покупателя обязательны' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Заказ должен содержать хотя бы один товар' });
    }
    if (items.reduce((sum, i) => sum + i.quantity, 0) < 3) {
      return res.status(400).json({ error: 'Минимальный заказ — от 3 штук' });
    }

    const order = await orderService.create({
      customer_name,
      customer_phone,
      comment,
      user_id,
      items,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/orders/:id/status
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'processing', 'completed', 'cancelled'];
    if (!status || !allowed.includes(status)) {
      return res.status(400).json({ error: `Статус должен быть одним из: ${allowed.join(', ')}` });
    }
    const order = await orderService.updateStatus(req.params.id, status);
    if (!order) return res.status(404).json({ error: 'Заказ не найден' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, updateStatus };
