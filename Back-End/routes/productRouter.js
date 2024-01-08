import {
  getAllProducts,
  getOneProduct,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../controllers/productController.js";

import express from "express";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/byId", getOneProduct);
productRouter.post("/", createProduct);
productRouter.patch("/", updateProduct);
productRouter.delete("/", deleteProduct);

export default productRouter;
