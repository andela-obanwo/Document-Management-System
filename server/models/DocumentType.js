module.exports = (sequelize, DataTypes) => {
  const DocumentType = sequelize.define('DocumentType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        DocumentType.hasMany(models.Documents, {
          foreignKey: 'docTypeID',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return DocumentType;
};
