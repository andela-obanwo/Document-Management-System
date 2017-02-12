module.exports = (sequelize, DataTypes) => {
  const AccessTypes = sequelize.define('AccessTypes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        AccessTypes.hasMany(models.Documents, {
          foreignKey: 'accessTypeId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return AccessTypes;
};
