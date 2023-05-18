'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    getImage(options){
      if(!this.type) return Promise.resolve(null);
      const mixinMethodName = `get${this.type}`;
      return this[mixinMethodName](options);
    }


    static associate(models) {
      Image.belongsTo(models.Review,{
        foreignKey: 'refId',
        constraints: false
      });
      Image.belongsTo(models.Spot,{
        foreignKey: 'refId',
        constraints: false
      });
    }
  }
  Image.init({
    url: DataTypes.STRING,
    preview: DataTypes.BOOLEAN,
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: ['Review', 'Spot']
      }
    },
    refId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
