require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorMiddleware = require("./middleware/error-middleware");
const models = require("./models/models");
const PORT = process.env.PORT || 5005;
const path = require("path");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log("Соединение с базой данных установлено."))
      .catch((err) => console.error("Ошибка подключения к базе данных:", err));

    await sequelize.sync();
    app.listen(PORT, () => console.log(`server start ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
