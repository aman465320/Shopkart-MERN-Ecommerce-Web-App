const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// user auth
const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "login first",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Something went wrong",
    });
  }
};


// admin auth
const isAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "unauthorized access",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "unauthorized access",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success :false,
      error,
      message : "Something went wrong"
    })
  }
};

module.exports = { isAuthenticated, isAdmin };
