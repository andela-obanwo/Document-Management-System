module.exports = (sequelize, DataTypes) => {
  const AccessType = sequelize.define('AccessType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        AccessType.hasMany(models.Documents, {
          foreignKey: 'accessTypeID',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return AccessType;
};
