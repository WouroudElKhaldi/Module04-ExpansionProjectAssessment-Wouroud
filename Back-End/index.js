import express from "express";
import sequelize from "./config/dbConnection.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRouter.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const staticDirectory = "./images";
app.use("/images", express.static(staticDirectory));

app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/auth", authRouter);

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Failed to synchronize database: ", error);
  });

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
