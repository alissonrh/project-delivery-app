module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    urlImage: {
      type: DataTypes.STRING,
      default: '',
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'products',
    underscored: true,
  });

  return Product;
};
