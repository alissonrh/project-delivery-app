module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pendente',
    },
  }, {
    createdAt: 'saleDate',
    updatedAt: false,
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'customer',
      // through: 'users',
    });
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller',
      // through: 'users',
    });
  };

  return Sale;
};