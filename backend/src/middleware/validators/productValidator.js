const validate = require('../validate');

const createProduct = validate({
  title: { required: true, type: 'string', maxLength: 255 },
  price: { required: true, type: 'number', min: 0 },
  description: { required: false, type: 'string' },
  category_id: { required: false, type: 'number', min: 1 },
});

const updateProduct = validate({
  title: { required: false, type: 'string', maxLength: 255 },
  price: { required: false, type: 'number', min: 0 },
  description: { required: false, type: 'string' },
  category_id: { required: false, type: 'number', min: 1 },
});

module.exports = { createProduct, updateProduct };
