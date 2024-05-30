const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
//GET

exports.getAllUser = async (req, res, next) => {
  const docs = await User.findAll();

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      data: docs,
    },
  });
};

//=======================CREATE USER=====================
exports.createUser = async (req, res, next) => {
  const docs = await User.create(req.body);
  res.status(200).json({
    status: "The note has been created",
    results: docs.length,
    data: {
      data: docs,
    },
  });
};

//====================LOGIN====================

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) return res.status(404).json({ error: "User did not found" });

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatePassword) {
      return res.status(401).json({ error: "Wrong password" });
    }
    const token = jwt.sign({ userId: user.id }, "secreto", { expiresIn: "1h" });
    return res
      .status(200)
      .json({ message: "Login sucessfuly", token, userId: user.id });
  } catch (error) {
    // Manejar cualquier error que pueda ocurrir durante la búsqueda o validación

    return res.status(500).json({ error: "Internal Error" });
  }
};
