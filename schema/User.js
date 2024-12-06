module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  return Account;
};
