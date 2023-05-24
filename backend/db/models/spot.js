'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(
        models.Booking,{
          foreignKey: 'spotId',
          otherKey: 'id'
      }),
      Spot.hasMany(
        models.Review,{
          foreignKey: 'spotId',
          otherKey: 'id'
      }),
      Spot.hasMany(
        models.Image, {
          foreignKey: 'refId',
          constraints: false,
          scope: {
            type: 'Spot'
          },
          as: 'SpotImages'
      }),
      Spot.belongsTo(models.User, {
        foreignKey: 'id',
        otherKey: 'userId',
        as: 'Owner'
      })
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        min: -90,
        max: 90
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        min: -180,
        max: 180
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 50]
      }
    },
    description: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }

  }, {
    sequelize,
    validate: {
      bothCoordsOrNone() {
        if ((this.lat === null) !== (this.lng === null)) {
          throw new Error('Please enter complete coordinates or leave them out.');
        }
      }
    },
    modelName: 'Spot',
  });
  return Spot;
};
