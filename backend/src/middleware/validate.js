// Фабрика middleware-валидации
// rules - объект { fieldName: { required, type, min, max } }
const validate = (rules) => (req, res, next) => {
  const errors = [];
  const body = req.body;

  for (const [field, options] of Object.entries(rules)) {
    const value = body[field];

    if (options.required && (value === undefined || value === null || value === '')) {
      errors.push(`Поле "${field}" обязательно`);
      continue;
    }

    if (value !== undefined && value !== null && value !== '') {
      if (options.type === 'number' && isNaN(Number(value))) {
        errors.push(`Поле "${field}" должно быть числом`);
      }
      if (options.type === 'string' && typeof value !== 'string') {
        errors.push(`Поле "${field}" должно быть строкой`);
      }
      if (options.min !== undefined && Number(value) < options.min) {
        errors.push(`Поле "${field}" должно быть не менее ${options.min}`);
      }
      if (options.maxLength !== undefined && String(value).length > options.maxLength) {
        errors.push(`Поле "${field}" не должно превышать ${options.maxLength} символов`);
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = validate;
