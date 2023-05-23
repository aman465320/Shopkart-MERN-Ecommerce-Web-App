const { default: mongoose } = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    //  all products in the order
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    // payment info
    payment: {},
    // who is the buyer i.e user
    buyer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    // payment status
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delieved", "Cancelled"],
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
