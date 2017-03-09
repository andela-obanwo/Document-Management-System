export default (sequelize, DataTypes) => {
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
          foreignKey: 'departmentId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Departments;
};
