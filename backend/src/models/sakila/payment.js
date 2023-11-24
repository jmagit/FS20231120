const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Payment', {
    paymentId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'payment_id'
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_id'
      },
      field: 'customer_id'
    },
    staffId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staff_id'
      },
      field: 'staff_id'
    },
    rentalId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rental',
        key: 'rental_id'
      },
      field: 'rental_id'
    },
    amount: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'payment_date'
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'last_update'
    }
  }, {
    sequelize,
    tableName: 'payment',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "idx_fk_customer_id",
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "idx_fk_staff_id",
        fields: [
          { name: "staff_id" },
        ]
      },
      {
        name: "PK__payment__ED1FC9EB193AD965",
        unique: true,
        fields: [
          { name: "payment_id" },
        ]
      },
    ]
  });
};
