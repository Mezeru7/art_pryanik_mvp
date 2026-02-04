const sequelize = require('../config/database');

const User = require('./User')(sequelize);
const Category = require('./Category')(sequelize);
const Product = require('./Product')(sequelize);
const ProductImage = require('./ProductImage')(sequelize);
const Order = require('./Order')(sequelize);
const OrderItem = require('./OrderItem')(sequelize);
const BlogPost = require('./BlogPost')(sequelize);
const Request = require('./Request')(sequelize);
const RefreshToken = require('./RefreshToken')(sequelize);
const PasswordReset = require('./PasswordReset')(sequelize);

User.hasMany(Order, { foreignKey: 'user_id' });
User.hasMany(BlogPost, { foreignKey: 'author_id' });
User.hasMany(RefreshToken, { foreignKey: 'user_id' });

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Product.hasMany(ProductImage, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

Order.belongsTo(User, { foreignKey: 'user_id', constraints: false });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });

OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

BlogPost.belongsTo(User, { foreignKey: 'author_id', as: 'author' });

RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  ProductImage,
  Order,
  OrderItem,
  BlogPost,
  Request,
  RefreshToken,
  PasswordReset,
};
