'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(
        models.Booking, {
          foreignKey: 'userId',
          otherKey: 'id',
          onDelete: 'CASCADE',
          hooks: true
        }),
      User.hasMany(
        models.Review, {
          foreignKey: 'userId',
          otherKey: 'id',
        })
      User.hasMany(
        models.Spot, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE',
          hooks: true
      })
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    }, {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
