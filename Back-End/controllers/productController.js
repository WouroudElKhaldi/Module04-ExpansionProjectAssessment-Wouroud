import db from "../models/index.js";
const { ProductModel, UsersModel } = db;

export const createProduct = async (req, res) => {
  const { title, category, description, price, supplier, userId } = req.body;

  if (!title || !category || !description || !price || !supplier) {
    return res.status(400).json({
      error: "All fileds are required",
    });
  }
  try {
    const newProduct = await ProductModel.create({
      title: title,
      category: category,
      description: description,
      price: price,
      supplier: supplier,
      userId: userId,
    });

    res.status(200).json({ newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, error: "Error creating product" });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.body.id;
  const { title, category, description, price, supplier } = req.body;

  try {
    const updatedProduct = await ProductModel.update(
      {
        title: title,
        category: category,
        description: description,
        price: price,
        supplier: supplier,
      },
      {
        where: { id: productId },
      }
    );

    if (updatedProduct[0] === 0) {
      return res.status(404).json({ status: 404, error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, error: "Error updating product" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductModel.findAll({
      include: [
        {
          model: UsersModel,
        },
      ],
    });
    res.status(200).json(allProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, error: "Cannot fetch products" });
  }
};

export const getOneProduct = async (req, res) => {
  const productId = req.body.id;

  try {
    const product = await ProductModel.findOne({
      where: { id: productId },
      include: [
        {
          model: UsersModel,
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ status: 404, error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, error: "Error fetching product" });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.body.id;

  try {
    const deletedProduct = await ProductModel.destroy({
      where: { id: productId },
    });

    if (deletedProduct === 0) {
      return res.status(404).json({ status: 404, error: "Product not found" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, error: "Error deleting product" });
  }
};
