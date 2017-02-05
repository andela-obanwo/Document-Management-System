module.exports = (sequelize, DataTypes) => {
  const Departments = sequelize.define('Departments', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Departments.hasMany(models.Users, {
          foreignKey: 'departmentID',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Departments;
};
