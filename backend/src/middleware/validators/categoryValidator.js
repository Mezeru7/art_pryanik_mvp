const validate = require('../validate');

const createCategory = validate({
  name: { required: true, type: 'string', maxLength: 100 },
});

const updateCategory = validate({
  name: { required: false, type: 'string', maxLength: 100 },
});

module.exports = { createCategory, updateCategory };
