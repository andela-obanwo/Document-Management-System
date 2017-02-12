import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations defined here
        Users.belongsTo(models.Roles, {
          onDelete: 'CASCADE',
          foreignKey: 'roleId'
        });
        Users.belongsTo(models.Departments, {
          onDelete: 'CASCADE',
          foreignKey: 'departmentId'
        });

        Users.hasMany(models.Documents, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    },
    instanceMethods: {
      /**
       * Compare plain password to user's hashed password
       * @method
       * @param {String} password
       * @returns {Boolean} password match
       */
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      /**
       * Hash user's password
       * @method
       * @returns {Void} no return
       */
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(11));
      }
    },

    hooks: {
      beforeCreate(users) {
        users.hashPassword();
      },

      beforeUpdate(users) {
        if (users.changed.password) {
          users.hashPassword();
        }
      }
    }
  });
  return Users;
};
