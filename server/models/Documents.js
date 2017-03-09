export default (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accessTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    docTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Documents.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
        Documents.belongsTo(models.DocumentTypes, {
          foreignKey: 'docTypeId',
          onDelete: 'CASCADE'
        });
        Documents.belongsTo(models.AccessTypes, {
          foreignKey: 'accessTypeId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Documents;
};
