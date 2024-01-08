import db from "../models/index.js";
const { UsersModel, ProductModel } = db;
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  const { fullName, password, email, role } = req.body;
  const image = req.file?.filename;
  try {
    //check if user already exist
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await db.UsersModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    //create new user
    const user = await UsersModel.create({
      fullName: fullName,
      image: image,
      password: hashedPassword,
      email: email,
      role: role,
    });
    return res.status(200).json({ message: "User created successfully", user });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.UsersModel.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid email" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid  password" });
    }

    const token = generateToken(user);

    // Set token in HTTP-only cookie
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({ status: 200, message: "Login successful" });
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async (req, res) => {
  try {
    const allUsers = await UsersModel.findAll({
      include: [
        {
          model: ProductModel,
        },
      ],
    });
    res.status(200).json({ data: allUsers });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "cannot fetch Users" });
  }
};

export const getOneUser = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await UsersModel.findOne({
      where: { id: id },
      include: [
        {
          model: ProductModel,
        },
      ],
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "cannot fetch user" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.body.id;
  const image = req.file?.path;
  const { fullName, email, password, oldPassword, role } = req.body;

  try {
    const oldUser = await UsersModel.findByPk(id);
    if (password) {
      const isValidPassword = await bcrypt.compare(
        oldPassword,
        oldUser.password
      );
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }
      var hashedPassword = await bcrypt.hash(password, 10);
    } else if (!password) {
      hashedPassword = oldUser.password;
    }
    const user = await UsersModel.update(
      {
        fullName: fullName,
        email: email,
        password: hashedPassword,
        role: role,
        image: image,
      },
      {
        where: { id: id },
      }
    );

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export const deleteUser = async (req, res) => {
  const id = req.body.id;
  try {
    await db.UsersModel.destroy({ where: { id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: " could not delete User" });
  }
};

export const loggedInUser = (req, res) => {
  res.json({ user: req.user }).status(200);
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout successflu" });
  } catch (err) {
    console.log(err);
  }
};
