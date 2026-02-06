const { BlogPost, User } = require('../models');

const getAll = async () => {
  return BlogPost.findAll({
    include: [{ model: User, as: 'author', attributes: ['id', 'first_name', 'last_name'] }],
    order: [['created_at', 'DESC']],
  });
};

const getById = async (id) => {
  return BlogPost.findByPk(id, {
    include: [{ model: User, as: 'author', attributes: ['id', 'first_name', 'last_name'] }],
  });
};

module.exports = { getAll, getById };
