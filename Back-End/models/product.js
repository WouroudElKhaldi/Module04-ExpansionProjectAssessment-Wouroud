import {Model} from 'sequelize'
export default  (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.UsersModel)
    }
  }
  product.init(
    {
      title: DataTypes.STRING,
      category: DataTypes.ENUM(
        "Electronics",
        "Clothing and Fashion",
        "Home and Furniture",
        "Personal Care",
        "Games",
        "Books",
        "Pet Supplies",
        "Office Supplies",
        "Food and Beverages",
        "Art and Crafts"
      ),
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      supplier: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
