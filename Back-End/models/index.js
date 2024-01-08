import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import product from "./product.js";
import user from "./user.js";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);


const UsersModel = user(sequelize, Sequelize);
const ProductModel = product(sequelize, Sequelize);

const db = {
  sequelize,
  Sequelize,
  UsersModel,
  ProductModel
};


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
export default db;