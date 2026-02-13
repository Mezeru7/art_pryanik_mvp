const validate = require('../validate');

const createRequest = validate({
  name: { required: true, type: 'string', maxLength: 200 },
  phone: { required: true, type: 'string', maxLength: 20 },
  description: { required: false, type: 'string' },
});

module.exports = { createRequest };
