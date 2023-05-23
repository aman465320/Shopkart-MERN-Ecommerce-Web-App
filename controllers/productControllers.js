const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const fs = require("fs");

// requiring payment gateway
const gateway = require("../config/payment");

// paymetn gateway integration

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;

    if (!name || !description || !price || !category || !quantity || !image) {
      return res.status(500).send({ message: "please fill all fields" });
    }

    let newProduct = new Product({
      ...req.fields,
    });

    // adding image seperately
    if (image) {
      newProduct.image.data = fs.readFileSync(image.path);
      newProduct.image.contentType = image.type;
    }

    await newProduct.save();
    res.status(201).send({
      success: true,
      message: "Product created Successfully",
      newProduct,
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

const getAllProducts = async (req, res) => {
  try {
    // removing image from response and instead of adding only id , we are adding whole category object
    const allProducts = await Product.find({})
      .select("-image")
      .populate("category");
    res.status(200).send({
      success: true,
      count: allProducts.length,
      message: "Products fetched Successfully",
      allProducts,
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

const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // removing image from response and instead of adding only id , we are adding whole category object
    const product = await Product.findById(id)
      .select("-image")
      .populate("category");
    res.status(200).send({
      message: "Fetched product successfully",
      success: true,
      product,
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

const getProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("image");
    const { image } = product;
    const { data, contentType } = image;
    if (data) {
      res.set("Content-type", contentType);
      return res.status(200).send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, category, shipped } =
      req.fields;
    const { image } = req.files;

    if (!name) {
      return res.status(500).send({ error: "please fill name" });
    }
    if (!description) {
      return res.status(500).send({ error: "please fill description" });
    }
    if (!quantity) {
      return res.status(500).send({ error: "please fill quantity" });
    }
    if (!price) {
      return res.status(500).send({ error: "please fill price" });
    }
    if (!category) {
      return res.status(500).send({ error: "please fill category" });
    }
    if (!image) {
      return res.status(500).send({ error: "please fill image" });
    }

    // update the fields
    let newProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...req.fields,
      },
      { new: true }
    );

    // adding image seperately
    if (image) {
      newProduct.image.data = fs.readFileSync(image.path);
      newProduct.image.contentType = image.type;
    }

    res.status(201).send({
      success: true,
      message: "Product updated Successfully",
      newProduct,
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

const filterProduct = async (req, res) => {
  try {
    // checkbox and radoi button on frontend
    const { checked, radio } = req.body;

    let args = {};

    if (checked.length > 0) {
      // checked will contain id
      args.category = checked;
    }
    if (radio.length) {
      // ex radio = [40 59] so gte means greater equal to and lte means less equal to so mongodb will filter price greater equal to 40 and less equal to 59
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    // find the products from db
    const products = await Product.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: "Product filter error" });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.find({
      // or means either name or description has keyword
      $or: [
        {
          // searching on basis of keyword
          //  options = i means case sensitivity is not applied
          name: { $regex: keyword, $options: "i" },
        },
        {
          description: { $regex: keyword, $options: "i" },
        },
      ],
      // deselet photo
    }).select("-photo");
    res.status(200).send({ success: true, results });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Search Failed",
      error,
    });
  }
};

const similarProducts = async (req, res) => {
  try {
    const { pid, catid } = req.params;
    const products = await Product.find({
      category: catid,
      _id: { $ne: pid },
    })
      .select("-image")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
    });
  }
};

const categoryProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    const products = await Product.find({ category: id }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid)
      .populate("reviews.customer", "name")
      .select("reviews");
    let allReviews = product.reviews;

    res.status(200).send({
      success: true,
      message: "Reviews Fetched Successfully",
      allReviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cant Fetch Reviews",
      error,
    });
  }
};

const addProductReview = async (req, res) => {
  try {
    const { review } = req.body;
    const { id } = req.user;
    const { pid } = req.params;
    if (!review) {
      return res.status(500).send({
        success: false,
        message: "Please add review",
      });
    }

    const product = await Product.findById(pid);

    const newReview = {
      customer: id,
      reviewText: review,
    };
    product.reviews.push(newReview);
    await product.save();
    res
      .status(201)
      .send({ success: true, message: "Review Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cant add review",
      error,
    });
  }
};

// PAYMENT CONTROLLERS

const getBraintreeToken = async (req, res) => {
  try {
    // generate token using braintree gateway
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const makePayment = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let cartTotal = 0;
    // calculate total price
    cart.map((item) => (cartTotal += item.price));
    // transaction
    let newTransaction = gateway.transaction.sale(
      {
        amount: cartTotal,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const newOrder = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  singleProduct,
  getProductImage,
  deleteProduct,
  updateProduct,
  filterProduct,
  searchProduct,
  similarProducts,
  categoryProducts,
  getBraintreeToken,
  makePayment,
  getProductReviews,
  addProductReview,
};
