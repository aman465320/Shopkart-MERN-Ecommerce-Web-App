const { default: mongoose } = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // this associates to a particular category in the category model
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    shipped: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        customer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        reviewText: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
