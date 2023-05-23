const jwt = require("jsonwebtoken");

const sendCookie = (user, res, cookieStatus, sendMsg) => {
  // sending cookie
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(cookieStatus)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
      //   sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      //   secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .send({
      success: true,
      message: sendMsg,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token: token,
    });
};

module.exports = sendCookie;
