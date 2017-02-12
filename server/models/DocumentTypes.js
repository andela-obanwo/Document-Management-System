module.exports = (sequelize, DataTypes) => {
  const DocumentTypes = sequelize.define('DocumentTypes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        DocumentTypes.hasMany(models.Documents, {
          foreignKey: 'docTypeId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return DocumentTypes;
};
