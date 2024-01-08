import {Model} from 'sequelize'
export default (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.ProductModel, {
        foreignKey: 'userId',
        onUpdate: 'CASCADE',
        onDelete: "CASCADE"
      })
    }
  }
  user.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    role: DataTypes.ENUM('User','Product Creator')
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};