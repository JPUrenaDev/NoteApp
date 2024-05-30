const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sequelize = require("./db/connection");

const User = require("./model/User");
const Category = require("./model/Category");
const Note = require("./model/Note");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");
const categoryRouter = require("./routes/categoryRouter");
const app = express();

//==========PARSER============================

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

//==========CORS==============================

app.use(cors());

//================ROUTES================================

app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);
app.use("/api/v1/category", categoryRouter);
app.get("/", (req, res) => {
  res.send("server");
});
//====================RELATIONS DB====================

Note.belongsTo(User);
User.hasMany(Note);
Note.belongsTo(Category);
//====================error handling global============

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});
//=================SYNC DB
sequelize
  .sync()
  .then(() => {
    app.listen(process.env.DEV_DB_PORT, () => {
      console.log(`App runing http://localhost:${process.env.DEV_DB_PORT}`);
    });
  })
  .catch((err) => {});

//sequelize.sync({ force: true });
