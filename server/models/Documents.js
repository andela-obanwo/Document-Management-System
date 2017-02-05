module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accessTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    docTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Documents.belongsTo(models.Users, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        });
        Documents.belongsTo(models.DocumentType, {
          foreignKey: 'docTypeID',
          onDelete: 'CASCADE'
        });
        Documents.belongsTo(models.AccessType, {
          foreignKey: 'accessTypeID',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Documents;
};
