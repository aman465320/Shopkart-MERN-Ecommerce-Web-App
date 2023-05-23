const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const sendCookie = require("../utils/sendCookie");
const Order = require("../models/orderModel");
// register route

const registerUser = async (req, res) => {
  try {
    const { name, email, password, secret, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address || !secret) {
      return res.send({
        success: false,
        message: "please fill all the fields",
      });
    }

    // check existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(200).send({
        success: true,
        message: "user already exists",
      });
    }
    // hashing and saving in Db
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user = new User({
      name,
      email,
      password: hashedPassword,
      secret,
      phone,
      address,
    });

    user.save();
    res.send({
      success: true,
      message: "Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
      error,
    });
  }
};

// login route

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        success: false,
        message: "please fill all the fields",
      });
    }

    // validate user
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "invalid email or password",
      });
    }

    // matching passswords

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send({
        success: false,
        message: "invalid email or password",
      });
    }

    // sendingCookie
    sendCookie(user, res, 200, `Welcome ${user.name}`);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// logoutUser

const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      // sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      // secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .send({
      success: true,
      message: "user logged out successfully",
    });
};

//  forget password

const resetPassword = async (req, res) => {
  try {
    const { email, secret, newPassword } = req.body;
    // validate
    if (!email || !secret || !newPassword) {
      return res.status(400).send({ message: "please fill the fields" });
    }
    // check
    const user = await User.findOne({ email, secret });

    if (!user) {
      return res.send({
        success: false,
        message: "Incorrect email or secret",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: newHashedPassword });

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Something went Wrong",
      error,
    });
  }
};

// profile update

const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    let { password } = req.body;

    if (password) {
      password = await bcrypt.hash(password, 10);
    }
    const { id } = req.user;
    const user = await User.findByIdAndUpdate(
      id,
      {
        name: name || req.user.name,
        password: password || req.user.password,
        phone: phone || req.user.phone,
        address: address || req.user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ succes: false, message: "Failed to update profile", error });
  }
};

// get orders of user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "-image")
      .populate("buyer", "name");
    res.status(200).send({ success: true, orders });
    // res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cannot fetch orders",
      error,
    });
  }
};

// get all orders(only accessed by admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products", "-image")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.status(200).send({
      succes: true,

      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Admin Orders failed to fetch",
      error,
    });
  }
};

// order status update
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      { status: updatedStatus },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Status updated successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Status Update failed",
      error,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  updateProfile,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};
